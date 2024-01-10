import { ResolveUserFn, ValidateUserFn, GenericAuthPluginOptions } from "@envelop/generic-auth";
import { User } from "types/graphql";

export const resolveUserFn: ResolveUserFn<User> = async (context) => {
  try {
  } catch (error) {}

  return null;
};
export const validateUser: ValidateUserFn<User> = (params) => {
  /* ... */
};

export const authConfig: GenericAuthPluginOptions = {
  resolveUserFn,
  validateUser,
  mode: "protect-all",
};
