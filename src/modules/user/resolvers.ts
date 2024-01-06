import { UserServiceProvider } from "services";
import { HttpError } from "shared/utils/error-handler";
import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getUser: async (_parent, { id }, context) => {
      try {
        const userRepo = context.injector.get(UserServiceProvider);

        return await userRepo.getUser(Number(id));
      } catch (error) {
        throw new HttpError(null, error.message);
      }
    },
    listUsers: async (_parent, { page = 1, perPage = 10 }, context) => {
      try {
        const userRepo = context.injector.get(UserServiceProvider);

        return await userRepo.lisUsers(page, perPage);
      } catch (error) {
        throw new HttpError(null, error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_parent, { userInfo }, context) => {
      try {
        const userSerivce = context.injector.get(UserServiceProvider);

        return await userSerivce.createUser(userInfo);
      } catch (error) {
        throw new HttpError(null, error.message);
      }
    },
    updateUser: async (_parent, { id, userInfo }, context) => {
      try {
        const userRepo = context.injector.get(UserServiceProvider);

        await userRepo.updateUser(Number(id), userInfo);

        return true;
      } catch (error) {
        throw new HttpError(null, error.message);
      }
    },
    deleteUser: async (_parent, { id }, context) => {
      try {
        const userRepo = context.injector.get(UserServiceProvider);

        await userRepo.deleteUser(Number(id));

        return true;
      } catch (error) {
        throw new HttpError(null, error.message);
      }
    },
  },
};
