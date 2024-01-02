import { createApplication } from "graphql-modules";
import { globalModule } from "modules/global";

import { userModule } from "modules/user";

export const application = createApplication({
  modules: [globalModule, userModule],
});
