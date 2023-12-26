import { Resolvers, User } from "generated-types/graphql";

export const resolvers: Resolvers<User> = {
  Query: {
    hello: (root, args, context, info) => {
      return "world";
    },
  },
};
