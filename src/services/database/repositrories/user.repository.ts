import { Injectable, Inject, forwardRef } from "graphql-modules";

import { UserService, IUserService } from "../entities/user.entity";
import { UsersList, User, CreateUserInput, UpdateUserInput } from "types/graphql";

@Injectable()
export class UserRepository {
  constructor(@Inject(forwardRef(() => UserService)) private userService: IUserService) {}

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
    const user = this.userService.create({ ...newUser });

    return await user.save();
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
