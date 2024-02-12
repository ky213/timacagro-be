//Errors
export const ERRORS = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  INVALID_INPUT_ERROR: "INVALID_INPUT_ERROR",
  USER_EXISTS_ERROR: "USER_EXISTS_ERROR",
  USER_NOT_ACTIVE: "USER_NOT_ACTIVE",
  USER_EMAIL_NOT_CONFIRMED: "USER_EMAIL_NOT_CONFIRMED",
  ENTIY_EXISTS_ERROR: "PRODUCT_EXISTS_ERROR",
  USER_NOT_AUTHENTICATED: "USER_NOT_AUTHENTICATE",
  USER_ALREADY_AUTHENTICATED: "USER_ALREADY_AUTHENTICATE",
  INVALID_TOKEN: "INVALID_TOKEN",
};

//Sessoin and times
export const DELAYS = {
  SESSION_EXPIRATION_TIME: Number(process.env.SESSION_EXPIRATION_TIM),
  EMAIL_CONFIRMATION_EXPIRATION_TIME: Number(process.env.EMAIL_CONFIRMATION_EXPIRATION_TIME),
};

// Hosts
export const WEB_CLIENT_HOST = process.env.WEB_CLIENT_HOST;
export const WEB_CLIENT_PORT = process.env.WEB_CLIENT_PORT;

// client files dir
export const FILES_DIR = __dirname + "/../../uploads/clients-files";
