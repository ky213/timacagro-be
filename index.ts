import "reflect-metadata";
import dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import { appSchema } from "app";
import { createServer } from "http";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const yoga = createYoga({
  schema: appSchema,
});

const server = createServer(yoga);

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/graphql`);
});
