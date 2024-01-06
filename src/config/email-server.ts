import { TransportOptions } from "nodemailer";

export const emailServerOptions: TransportOptions = {
  //@ts-expect-error
  //TODO:fix type
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: process.env.NODE_ENV == "prod",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};
