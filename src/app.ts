import { createApplication } from "graphql-modules";
import { userModule } from "modules/user";

export const application = createApplication({
  modules: [userModule],
});

export const appSchema = application.schema;
