import { DateTimeResolver } from "graphql-scalars";

import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getDateTime() {
      return new Date().toISOString();
    },
  },
  Mutation: {
    randomize: (_root, _args, { pubSub }) => {
      const random = Math.random();
      pubSub.publish("global:random_number", random);
      return random;
    },
  },
  Subscription: {
    testConnection: {
      subscribe: async function* (_root, _args, { pubSub }) {
        for (let i = 30; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          yield i;
        }
      },
      resolve: (payload: number) => payload,
    },
    randomNumber: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("global:random_number"),
      resolve: (payload: number) => payload,
    },
  },
  DateTime: DateTimeResolver,
};
