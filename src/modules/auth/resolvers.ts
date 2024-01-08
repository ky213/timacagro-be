import { Resolvers } from "types/graphql";

import { UserServiceProvider, CacheServiceProvider } from "services";
import { HttpError } from "shared/utils/error-handler";
import { ERRORS } from "config/contants";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Mutation: {
    async confirmEmail(_root, { token }, { injector }) {
      const cacheStore = injector.get(CacheServiceProvider);
      const userSerivce = injector.get(UserServiceProvider);
      const userId = await cacheStore.get(token);

      if (userId) {
        const user = await userSerivce.getUser(Number(userId));

        if (user.emailConfirmed) throw new HttpError(400, "email already confirmed", ERRORS.INVALID_INPUT_ERROR);

        await userSerivce.updateUser(Number(userId), { emailConfirmed: true });

        return true;
      }

      return false;
    },
  },
};
