import { Injectable, Inject, forwardRef } from "graphql-modules";

import { UserRepositoryToken, IUserRepository, UserEntity } from "../repos";
import { UsersList, User, CreateUserInput, UpdateUserInput, Role } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { DELAYS, ERRORS, WEB_CLIENT_HOST, WEB_CLIENT_PORT } from "~/config";
import { PasswordSchema, CreateUserSchema } from "~/types/schemas/";
import { EmailServiceToken, CacheServiceProvider, IEmailService } from "~/services";
import { generateHash, generatePassword, generateToken } from "~/shared/utils/cyphers";

@Injectable()
export class UserServiceProvider {
  constructor(
    @Inject(forwardRef(() => UserRepositoryToken)) private userRepo: IUserRepository,
    @Inject(forwardRef(() => EmailServiceToken)) private emailService: IEmailService,
    @Inject(forwardRef(() => CacheServiceProvider)) private cacheService: CacheServiceProvider
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({ id });
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ email });
  }

  async getUserWithPassword(email: string) {
    return this.userRepo
      .createQueryBuilder("user")
      .where(`user.email=:email`, { email })
      .addSelect("user.password")
      .getOne();
  }

  async lisUsers(page: number, perPage: number): Promise<UsersList> {
    const [users, total] = await this.userRepo.findAndCount({
      skip: page,
      take: perPage,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      users,
      page,
      perPage,
      total,
    };
  }

  async createUser(newUser: CreateUserInput): Promise<User> {
    const errors = validateData<CreateUserInput>(CreateUserSchema, newUser);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check user exists
    const userExists = await this.userRepo.findOneBy({ email: newUser.email });

    if (userExists) throw new HttpError(400, "User with this email exists.", ERRORS.USER_EXISTS_ERROR);

    //generate random password
    const password = generatePassword();
    const passwordHash = await generateHash(password);

    //set points
    const currentPoints = [Role.DR, Role.ATC].includes(newUser.role) ? 0 : null;

    //save user
    const user = this.userRepo.create({ password: passwordHash, active: true, currentPoints, ...newUser });
    await this.userRepo.save(user);

    //send confirmation email
    this.sendConfirmationEmail(user, password);

    return user;
  }

  async updateUser(id: number, userData: Partial<UserEntity> | {}): Promise<Boolean> {
    await this.userRepo.update({ id }, { ...userData });

    return true;
  }

  async incUserPoints(id: number, points: number): Promise<Boolean> {
    await this.userRepo.increment({ id }, "currentPoints", points);

    return true;
  }

  async updateUserPassword(id: number, newPassword: string): Promise<Boolean> {
    const errors = validateData<{ password: string }>(PasswordSchema, { password: newPassword });

    if (errors.length) throw new HttpError(400, "Password format not valid", ERRORS.INVALID_INPUT_ERROR);

    const newHashedPassword = await generateHash(newPassword);

    await this.userRepo.update({ id }, { password: newHashedPassword });

    return true;
  }

  async deleteUser(id: number): Promise<Boolean> {
    await this.userRepo.softDelete({ id });

    return true;
  }

  async restoreUser(id: number): Promise<Boolean> {
    await this.userRepo.restore({ id });

    return true;
  }

  async sendConfirmationEmail(user: User, password: string) {
    const token = generateToken();

    await this.cacheService.set(token, `${user.id}`, DELAYS.EMAIL_CONFIRMATION_EXPIRATION_TIME);

    this.emailService.send(
      `support@timacagro.com`,
      user.email,
      `Welcome email`,
      `<h1>Welcome ${user.firstName}</h1>
       <p>follow this <a href="http://${WEB_CLIENT_HOST}:${WEB_CLIENT_PORT}/auth/confirm-email/?token=${token}">link</a> to confirm you email address.</p>
       <p>Your login  is:${user.email}</p>.
       <p>Your initial password is:${password}</p>.
       <p>Please reset your password on your first login.</p>
    `
    );
  }
  async sendResetPasswordEmail(user: User) {
    const token = generateToken();

    await this.cacheService.set(token, `${user.email}`, DELAYS.EMAIL_CONFIRMATION_EXPIRATION_TIME);

    this.emailService.send(
      `support@timacagro.com`,
      user.email,
      `Password reset email`,
      `<h6>Hello,</h6>
       <p>Please, follow this <a href="https://${WEB_CLIENT_HOST}:${WEB_CLIENT_PORT}/reset-password/?token=${token}">link</a> to reset your password.
    `
    );
  }

  async searchUser(searchQuery: string): Promise<User[]> {
    return await this.userRepo
      .createQueryBuilder("user")
      .select()
      .where("user.firstName ILIKE :searchQuery", { searchQuery: `%${searchQuery}%` })
      .orWhere("user.lastName ILIKE :searchQuery", { searchQuery: `%${searchQuery}%` })
      .orWhere("user.email ILIKE :searchQuery", { searchQuery: `%${searchQuery}%` })
      .getMany();
  }
}
