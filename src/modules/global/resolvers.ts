import { DateTimeResolver } from "graphql-scalars";
import { createPubSub } from "graphql-yoga";

import { Resolvers } from "types/graphql";

const pubSub = createPubSub();

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getDateTime() {
      return new Date().toISOString();
    },
  },
  Mutation: {
    randomize: () => {
      const random = Math.random();
      pubSub.publish("random_number", random);
      return random;
    },
  },
  Subscription: {
    testConnection: {
      subscribe: async function* () {
        for (let i = 30; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          yield i;
        }
      },
      resolve: (payload: number) => payload,
    },
    randomNumber: {
      subscribe: () => pubSub.subscribe("random_number"),
      resolve: (payload: number) => payload,
    },
  },
  DateTime: DateTimeResolver,
};
