import { Resolvers, User } from "generated-types/graphql";

export const resolvers: Resolvers<User> = {
import { Resolvers } from "generated-types/graphql";
import { ApiKey } from ".";
import { User } from "data-sources/database/user";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    hello: (root, args, context, info) => {
      return "world";
    },
    hello: (_parent, { id }, context) => {
      const user = context.injector.get(User);

      return "world " + user.getName() + id;
    },
  },
};
