import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { useGenericAuth } from "@envelop/generic-auth";
import { useJWT } from "@graphql-yoga/plugin-jwt";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import cors from "cors";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { pubSub, JWT_CONFIG, initCache, initDatabse } from "./src/config";
import { authConfig } from "./src/modules/auth/auth-controllers";
import { application } from "./src/app";
import { logger } from "./src/shared/utils/logger";

async function startServer() {
  try {
    const app = express();
    const port = process.env.SERVER_PORT;

    app.use(express.json({ limit: "21mb", type: "application/json" }));

    const db = await initDatabse();

    const cache = await initCache();

    const yoga = createYoga({
      logging: "debug",
      maskedErrors: process.env.NODE_ENV === "prod",
      context: { db, pubSub, cache },
      plugins: [useCookies(), useJWT(JWT_CONFIG), useGenericAuth(authConfig), useGraphQLModules(application)],
    });

    if (process.env.NODE_ENV === "prod") {
      app.use(
        cors({
          credentials: true,
          methods: ["GET", "POST"],
          origin: ["http://localhost:3000", "http://localhost:58927", "*"],
        })
      );
    }
    app.use(yoga);
    app.use((error: Error, _req: Request, _res: Response, _next: NextFunction): void => {
      logger.error(error.message);
    });
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  } catch (error) {
    logger.error("Server failed to start: ", error);
  }
}

startServer().catch((error) => {
  logger.error("Server error: ", error.message);
});
