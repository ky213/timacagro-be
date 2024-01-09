import { DateTimeResolver } from "graphql-scalars";
import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getDateTime() {
      return new Date().toISOString();
    },
  },
  DateTime: DateTimeResolver,
};
