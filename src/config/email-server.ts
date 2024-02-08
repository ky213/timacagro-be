import SMTPTransport from "nodemailer/lib/smtp-transport";

export const emailServerOptions: SMTPTransport.Options = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.NODE_ENV == "prod",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};
