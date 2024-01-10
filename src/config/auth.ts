import { JwtPluginOptions } from "@graphql-yoga/plugin-jwt";

export const JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY;

export const JWT_CONFIG: JwtPluginOptions = {
  issuer: process.env.SERVER_HOST + `:${process.env.SERVER_PORT}`,
  signingKey: JWT_SIGNING_KEY,
  getToken: async ({ request }) => (await request.cookieStore?.get("cookie"))?.value,
};

export const COOKIE_CONFIG = {
  name: "cookie",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "prod",
  domain: process.env.SERVER_HOST,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  httpOnly: true,
};
