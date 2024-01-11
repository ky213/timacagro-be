import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { useGenericAuth } from "@envelop/generic-auth";
import { useJWT } from "@graphql-yoga/plugin-jwt";
import { useCookies } from "@whatwg-node/server-plugin-cookies";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { application } from "app";
import { database } from "config/database";
import { authConfig } from "modules/auth/auth-controllers";
import { JWT_CONFIG } from "config/auth";

async function startServer() {
  try {
    await database.initialize();

    console.log(`Database connected.`);

    const yoga = createYoga({
      logging: process.env.NODE_ENV === "dev",
      maskedErrors: process.env.NODE_ENV === "prod",
      plugins: [useCookies(), useJWT(JWT_CONFIG), useGenericAuth(authConfig), useGraphQLModules(application)],
    });

    const app = express();
    const port = process.env.SERVER_PORT;

    app.use(yoga);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
