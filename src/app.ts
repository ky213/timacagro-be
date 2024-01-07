import { createApplication } from "graphql-modules";
import { globalModule } from "modules/global";

import { userModule } from "modules/user";
import { EmailServiceProvider, CacheServiceProvider } from "services";
import { RedisServiceProvider } from "config/redis";

export const application = createApplication({
  modules: [globalModule, userModule],
  providers: [EmailServiceProvider, RedisServiceProvider, CacheServiceProvider],
});
