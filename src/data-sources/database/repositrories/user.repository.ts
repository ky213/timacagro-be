import { Injectable, Inject, forwardRef } from "graphql-modules";

import { UserService, IUserService } from "../entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@Inject(forwardRef(() => UserService)) private userService: IUserService) {}

  async getName() {
    return "getName ";
  }
  async getCount() {
    return await this.userService.count();
  }
}
