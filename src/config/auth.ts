import { JwtPluginOptions } from "@graphql-yoga/plugin-jwt";
import { CookieListItem } from "@whatwg-node/cookie-store";
import { Secret } from "jsonwebtoken";

export const JWT_SIGNING_KEY: Secret = `${process.env.JWT_SIGNING_KEY}`;

export const JWT_CONFIG: JwtPluginOptions = {
  issuer: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  signingKey: `${JWT_SIGNING_KEY}`,
};

export const COOKIE_CONFIG: CookieListItem = {
  name: "authorization",
  sameSite: "strict",
  secure: process.env.NODE_ENV === "prod",
  domain: `${process.env.SERVER_HOST}`,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  httpOnly: true,
};
