import { ResolveUserFn, ValidateUserFn, GenericAuthPluginOptions } from "@envelop/generic-auth";
import { User } from "types/graphql";
import jwt from "jsonwebtoken";

import { HttpError } from "shared/utils/error-handler";
import { ERRORS } from "config/contants";

export const resolveUserFn: ResolveUserFn<User, GraphQLModules.Context> = async (context) => {
  try {
    //@ts-ignore //TODO:set correct types
    const token = (await context.request.cookieStore?.get("authorization"))?.value;
    const user = jwt.decode(token) as User;

    return user;
  } catch (error) {
    console.error("Auth controller failed to validate token.\n", error.message);
  }

  return null;
};

export const validateUser: ValidateUserFn<User> = (params) => {
  if (params.executionArgs.operationName === "Login") {
    return;
  }

  if (!params.user) {
    throw new HttpError(401, `User Unauthenticated!`, ERRORS.USER_NOT_AUTHENTICATED);
  }
};

export const authConfig: GenericAuthPluginOptions<User, GraphQLModules.Context> = {
  resolveUserFn,
  validateUser,
  mode: "protect-all",
};
