import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { useGenericAuth } from "@envelop/generic-auth";
import { useJWT } from "@graphql-yoga/plugin-jwt";
import { useCookies } from "@whatwg-node/server-plugin-cookies";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { database, pubSub, JWT_CONFIG, redisClient as cache, initCache, initDatabse } from "config";
import { authConfig } from "modules/auth/auth-controllers";
import { application } from "app";
import { logger } from "shared/utils/logger";

async function startServer() {
  try {
    await initDatabse();

    await initCache();

    const yoga = createYoga({
      logging: process.env.NODE_ENV === "dev",
      maskedErrors: process.env.NODE_ENV === "prod",
      context: { pubSub, cache },
      plugins: [useCookies(), useJWT(JWT_CONFIG), useGenericAuth(authConfig), useGraphQLModules(application)],
    });

    const app = express();
    const port = process.env.SERVER_PORT;

    app.use(yoga);
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  } catch (error) {
    logger.error("Server failed to start: ", error);
  }
}

startServer();
