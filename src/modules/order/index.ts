import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ClientServiceProvider, ProductServiceProvider, UserServiceProvider } from "~/services";
import {
  ProductRepositoryProvider,
  UserRepositoryProvider,
  OrderRepositoryProvider,
  ClientRepositoryProvider,
} from "~/services/database/repos";
import { OrderServiceProvider } from "~/services/database/services/order.service";

export const OrderModule = createModule({
  id: "order-module",
  dirname: __dirname,
  providers: [
    ProductRepositoryProvider,
    UserRepositoryProvider,
    OrderRepositoryProvider,
    ClientRepositoryProvider,
    ProductServiceProvider,
    UserServiceProvider,
    OrderServiceProvider,
    ClientServiceProvider,
  ],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./*resolvers.ts")),
});
