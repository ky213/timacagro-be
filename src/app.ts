import { createApplication } from "graphql-modules";
import { userModule } from "modules/user";

// This is your application, it contains your GraphQL schema and the implementation of it.
export const application = createApplication({
  modules: [userModule],
});

// This is your actual GraphQL schema
export const appSchema = application.schema;
