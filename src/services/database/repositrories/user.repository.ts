import { Injectable, Inject, forwardRef } from "graphql-modules";

import { UserService, IUserService } from "../entities/user.entity";
import { UsersList, User } from "types/graphql";

@Injectable()
export class UserRepository {
  constructor(@Inject(forwardRef(() => UserService)) private userService: IUserService) {}

  async lisUser(page: number, perPage: number): Promise<UsersList> {
    const users: User[] = await this.userService.find({ skip: page, take: perPage });
    const total = await this.userService.count();

    return {
      users,
      page,
      perPage,
      total,
    };
  }
}
