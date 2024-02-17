import { ResolveUserFn, ValidateUserFn, GenericAuthPluginOptions } from "@envelop/generic-auth";
import jwt from "jsonwebtoken";

import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS, ACL } from "~/config";
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
  const requiredRoles = ACL[`${params.executionArgs.operationName}`];

  if (requiredRoles) {
    if (!params.user) return new HttpError(401, `User Unauthenticated!`, ERRORS.USER_NOT_AUTHENTICATED);

    if (!requiredRoles.includes(params.user.Role))
      return new HttpError(403, `Unauthorized!`, ERRORS.USER_NOT_AUTHORIZED);
  }
};

export const authConfig: GenericAuthPluginOptions<Session, GraphQLModules.Context, "session"> = {
  resolveUserFn,
  validateUser,
  mode: "protect-all",
  contextFieldName: "session",
};
