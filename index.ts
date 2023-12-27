import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createYoga } from "graphql-yoga";
import { useGraphQLModules } from "@envelop/graphql-modules";

import { application } from "app";
import { db } from "config/database";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const yoga = createYoga({
  plugins: [useGraphQLModules(application)],
});

const app = express();

app.use(yoga);

const port = process.env.SERVER_PORT;

db.initialize()
  .then(() => {
    console.log("Database initialized");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
