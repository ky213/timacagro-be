import { DateTimeResolver } from "graphql-scalars";
import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getDateTime() {
      return new Date().toISOString();
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
  },
  DateTime: DateTimeResolver,
};
