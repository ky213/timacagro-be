import { createApplication } from "graphql-modules";
import { globalModule } from "modules/global";

import { userModule } from "modules/user";
import { EmailServiceProvider, RedisServiceProvider } from "services";

export const application = createApplication({
  modules: [globalModule, userModule],
  providers: [EmailServiceProvider, RedisServiceProvider],
});
