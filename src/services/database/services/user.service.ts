import { Injectable, Inject, forwardRef } from "graphql-modules";
import bcrypt from "bcrypt";

import { UserRepositoryToken, IUserRepository } from "../repos";
import { UsersList, User, CreateUserInput, UpdateUserInput } from "types/graphql";
import { validateData } from "shared/utils/validator";
import { HttpError } from "shared/utils/error-handler";
import { ERRORS } from "config/contants";
import UserSchema from "types/schemas/user.schema";
import { EmailServiceToken, RedisServiceToken, IEmailService, IRedisService } from "services";

@Injectable()
export class UserServiceProvider {
  constructor(
    @Inject(forwardRef(() => UserRepositoryToken)) private userService: IUserRepository,
    @Inject(forwardRef(() => EmailServiceToken)) private emailService: IEmailService,
    @Inject(forwardRef(() => RedisServiceToken)) private redisService: IRedisService
  ) {}

  async getUser(id: number): Promise<User> {
    return await this.userService.findOneBy({ id });
  }

  async lisUsers(page: number, perPage: number): Promise<UsersList> {
    const users: User[] = await this.userService.find({ skip: page, take: perPage });
    const total = await this.userService.count();

    return {
      users,
      page,
      perPage,
      total,
    };
  }

  async createUser(newUser: CreateUserInput): Promise<User> {
    const errors = validateData<CreateUserInput>(UserSchema, newUser);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check user exists
    const userExists = await this.userService.findOneBy({ email: newUser.email });

    if (userExists) throw new HttpError(400, "User with this email exists.", ERRORS.USER_EXISTS_ERROR);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashedPassword;

    //save user
    const user = this.userService.create({ ...newUser });
    await user.save();

    //send confirmation email
    this.emailService.send(
      "support@timacagro.com",
      newUser.email,
      "Welcome email",
      `<h1>Welcome ${newUser.firstName}</h1>`
    );

    // const red = await this.redisService.set("testKey", "any value");
    // console.log("RED----set", red);
    const key = this.redisService.get("testkey");

    return user;
  }

  async updateUser(id: number, userData: UpdateUserInput): Promise<Boolean> {
    await this.userService.update({ id }, { ...userData });

    return true;
  }

  async deleteUser(id: number): Promise<Boolean> {
    await this.userService.update({ id }, { active: false });

    return true;
  }
}
