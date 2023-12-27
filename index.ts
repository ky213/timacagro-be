import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { DataSource } from "typeorm";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { database } from "config/database";
import { application } from "app";

async function startServer() {
  try {
    const dbConnection: DataSource = await database.initialize();
    const yoga = createYoga({
      plugins: [useGraphQLModules(application)],
      context: { db: dbConnection },
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
