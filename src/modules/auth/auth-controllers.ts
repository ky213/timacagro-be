import { ResolveUserFn, ValidateUserFn, GenericAuthPluginOptions } from "@envelop/generic-auth";
import { User } from "types/graphql";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "shared/utils/error-handler";
import { ERRORS } from "config";

export const resolveUserFn: ResolveUserFn<User, GraphQLModules.Context> = async (context) => {
  try {
    const token = (await context.request.cookieStore?.get("authorization"))?.value;
    const user = jwt.decode(`${token}`) as JwtPayload & User;

    return user;
  } catch (error: any | Error) {
    console.error("Auth controller failed to validate token.\n", error.message);
  }

  return null;
};

export const validateUser: ValidateUserFn<User> = (params) => {
  if (["Login", "ForgotPassword", "ResetPassword", "ConfirmEmail"].includes(`${params.executionArgs.operationName}`)) {
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
