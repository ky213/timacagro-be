import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { database } from "config/database";
import { application } from "app";

async function startServer() {
  try {
    await database.initialize();

    console.log(`Database connected.`);

    const yoga = createYoga({
      plugins: [useGraphQLModules(application)],
      logging: process.env.NODE_ENV === "dev",
      maskedErrors: process.env.NODE_ENV === "prod",
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
