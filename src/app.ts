import { createApplication } from "graphql-modules";

import { GlobalModule, AuthModule, UserModule, ProductlModule, InvoicelModule } from "~/modules";
import { EmailServiceProvider, CacheServiceProvider, PubSubServiceProvider } from "~/services";
import { RedisServiceProvider } from "~/config";
import { ClientlModule } from "./modules/client";

export const application = createApplication({
  modules: [GlobalModule, AuthModule, UserModule, ProductlModule, InvoicelModule, ClientlModule],
  providers: [EmailServiceProvider, RedisServiceProvider, CacheServiceProvider, PubSubServiceProvider],
});
