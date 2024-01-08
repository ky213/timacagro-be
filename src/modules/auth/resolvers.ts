import { UserServiceProvider, CacheServiceProvider } from "services";
import { HttpError } from "shared/utils/error-handler";
import { Resolvers } from "types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Mutation: {
    confirmEmail(_root, { token }, { injector }) {
      const cacheStore = injector.get(CacheServiceProvider);
      const existingToken = cacheStore.get(token);

      return true;
    },
  },
};
