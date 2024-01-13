import { createApplication } from "graphql-modules";
import { PubSub } from "graphql-yoga";

import { GlobalModule, AuthModule, UserModule } from "modules";
import { EmailServiceProvider, CacheServiceProvider, PubSubServiceProvider } from "services";
import { RedisServiceProvider } from "config/redis";

export const application = createApplication({
  modules: [GlobalModule, UserModule, AuthModule],
  providers: [EmailServiceProvider, RedisServiceProvider, CacheServiceProvider, PubSubServiceProvider],
});
