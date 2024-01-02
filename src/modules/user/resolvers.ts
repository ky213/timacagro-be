import { UserRepository } from "services/database/repositrories/user.repository";
import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    listUsers: async (_parent, { page = 1, perPage = 10 }, context) => {
      try {
        const user = context.injector.get(UserRepository);

        return await user.lisUser(page, perPage);
      } catch (error) {
        throw error;
      }
    },
  },
};
