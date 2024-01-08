import { Resolvers } from "types/graphql";

import { UserServiceProvider, CacheServiceProvider } from "services";
import { HttpError } from "shared/utils/error-handler";
import { isSameHash } from "shared/utils/cyphers";
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
    async login(_root, { email, password }, { injector }) {
      const cacheStore = injector.get(CacheServiceProvider);
      const userSerivce = injector.get(UserServiceProvider);
      const user = await userSerivce.getUserWithPassword(email);

      if (!user) throw new HttpError(400, "invalid user credentials", ERRORS.INVALID_INPUT_ERROR);

      if (!isSameHash(password, user.password))
        throw new HttpError(400, "invalid user credentials", ERRORS.INVALID_INPUT_ERROR);

      if (!user.emailConfirmed) throw new HttpError(401, "user email not confirmed", ERRORS.USER_EMAIL_NOT_CONFIRMED);

      if (!user.active) throw new HttpError(401, "user not active", ERRORS.USER_NOT_ACTIVE);

      return { token: "token" };
    },
  },
};
