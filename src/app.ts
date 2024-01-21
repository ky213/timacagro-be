import { createApplication } from "graphql-modules";

import { GlobalModule, AuthModule, UserModule, ProductlModule, InvoicelModule } from "~/modules";
import { EmailServiceProvider, CacheServiceProvider, PubSubServiceProvider } from "~/services";
import { RedisServiceProvider } from "~/config";

export const application = createApplication({
  modules: [GlobalModule, AuthModule, UserModule, ProductlModule, InvoicelModule],
  providers: [EmailServiceProvider, RedisServiceProvider, CacheServiceProvider, PubSubServiceProvider],
});
