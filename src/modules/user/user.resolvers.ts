import { UserServiceProvider } from "~/services";
import { HttpError } from "~/shared/utils/error-handler";
import { Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getUser: async (_parent, { id }, context) => {
      const userService = context.injector.get(UserServiceProvider);

      return await userService.getUserById(Number(id));
    },
    listUsers: async (_parent, { page = 0, perPage = 10 }, context) => {
      const userService = context.injector.get(UserServiceProvider);

      return await userService.lisUsers(page, perPage);
    },
    searchUser: async (_parent, { searchQuery }, context) => {
      const userService = context.injector.get(UserServiceProvider);

      return await userService.searchUser(searchQuery);
    },
  },
  Mutation: {
    createUser: async (_parent, { userInfo }, context) => {
      const userSerivce = context.injector.get(UserServiceProvider);

      return await userSerivce.createUser(userInfo);
    },
    updateUser: async (_parent, { id, userInfo }, context) => {
      const userRepo = context.injector.get(UserServiceProvider);

      await userRepo.updateUser(Number(id), { ...userInfo });

      return true;
    },
    deleteUser: async (_parent, { id }, context) => {
      const userRepo = context.injector.get(UserServiceProvider);

      await userRepo.deleteUser(Number(id));

      return true;
    },
    restoreUser: async (_parent, { id }, context) => {
      const userRepo = context.injector.get(UserServiceProvider);

      await userRepo.restoreUser(id);

      return true;
    },
  },
};
