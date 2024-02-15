import { ResolveUserFn, ValidateUserFn, GenericAuthPluginOptions } from "@envelop/generic-auth";
import { User } from "~/types/graphql";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS } from "~/config";
import { Session } from "~/types/global";

export const resolveUserFn: ResolveUserFn<Session, GraphQLModules.Context> = async (context) => {
  try {
    const token = (await context.request.cookieStore?.get("authorization"))?.value;
    const session = jwt.decode(`${token}`) as Session;
    return session;
  } catch (error: any | Error) {
    console.error("Auth controller failed to validate token.\n", error.message);
    return null;
  }
};

export const validateUser: ValidateUserFn<Session> = (params) => {
  if (!["Login", "ForgotPassword", "ResetPassword", "ConfirmEmail"].includes(`${params.executionArgs.operationName}`)) {
    if (!params.user) {
      return new HttpError(401, `User Unauthenticated!`, ERRORS.USER_NOT_AUTHENTICATED);
    }
  }
};

export const authConfig: GenericAuthPluginOptions<Session, GraphQLModules.Context, "session"> = {
  resolveUserFn,
  validateUser,
  mode: "protect-all",
  contextFieldName: "session",
};
