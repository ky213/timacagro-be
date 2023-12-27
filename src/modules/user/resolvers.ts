import { UserRepository } from "data-sources/database/repositrories/user.repository";
import { Resolvers } from "generated-types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    hello: async (_parent, _args, context) => {
      const user = context.injector.get(UserRepository);

      return "world " + (await user.getName()) + " " + (await user.getCount());
    },
  },
};
