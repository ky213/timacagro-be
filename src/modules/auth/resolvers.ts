import { Resolvers } from "types/graphql";
import jwt from "jsonwebtoken";

import { UserServiceProvider, CacheServiceProvider } from "services";
import { HttpError } from "shared/utils/error-handler";
import { isSameHash } from "shared/utils/cyphers";
import { ERRORS } from "config/contants";
import { COOKIE_CONFIG, JWT_SIGNING_KEY } from "config/auth";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Mutation: {
    async confirmEmail(_root, { token }, { injector }) {
      const cacheStore = injector.get(CacheServiceProvider);
      const userSerivce = injector.get(UserServiceProvider);
      const userId = await cacheStore.get(token);

      if (userId) {
        const user = await userSerivce.getUserById(Number(userId));

        if (user.emailConfirmed) throw new HttpError(400, "email already confirmed", ERRORS.INVALID_INPUT_ERROR);

        await userSerivce.updateUser(Number(userId), { emailConfirmed: true });

        return true;
      }

      return false;
    },

    async login(_root, { email, password }, { injector, request }) {
      const userSerivce = injector.get(UserServiceProvider);
      const user = await userSerivce.getUserWithPassword(email);

      if (!user) throw new HttpError(400, "invalid user credentials", ERRORS.INVALID_INPUT_ERROR);

      if (!isSameHash(password, user.password))
        throw new HttpError(400, "invalid user credentials", ERRORS.INVALID_INPUT_ERROR);

      if (!user.emailConfirmed) throw new HttpError(401, "user email not confirmed", ERRORS.USER_EMAIL_NOT_CONFIRMED);

      if (!user.active) throw new HttpError(401, "user not active", ERRORS.USER_NOT_ACTIVE);

      const token = jwt.sign({ username: user.email }, JWT_SIGNING_KEY, { subject: `${user.id}` });

      await request.cookieStore?.set({ ...COOKIE_CONFIG, value: token });

      return true;
    },
    async logout(_root, _args, { request }) {
      await request.cookieStore?.delete("authorization");

      return true;
    },
    async forgotPassword(_root, { email }, { injector }) {
      const userService = injector.get(UserServiceProvider);
      const user = await userService.getUserByEmail(email);

      if (!user) return null;

      if (!user.emailConfirmed) throw new HttpError(400, "user email not confirmed", ERRORS.USER_EMAIL_NOT_CONFIRMED);

      if (!user.active) throw new HttpError(400, "user not active", ERRORS.USER_NOT_ACTIVE);

      await userService.sendResetPasswordEmail(user);

      return "An email has been sent to you for password reset";
    },
  },
};
