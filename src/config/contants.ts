//Errors
export const ERRORS = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  INVALID_INPUT_ERROR: "INVALID_INPUT_ERROR",
  USER_EXISTS_ERROR: "USER_EXISTS_ERROR",
  USER_NOT_ACTIVE: "USER_NOT_ACTIVE",
  USER_EMAIL_NOT_CONFIRMED: "USER_EMAIL_NOT_CONFIRMED",
};

export const DELAYS = {
  SESSION_EXPIRATION_TIME: Number(process.env.SESSION_EXPIRATION_TIM),
  EMAIL_CONFIRMATION_EXPIRATION_TIME: Number(process.env.EMAIL_CONFIRMATION_EXPIRATION_TIME),
};
