import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ProductServiceProvider, UserServiceProvider } from "~/services";
import { ProductRepositoryProvider, UserRepositoryProvider, OrderRepositoryProvider } from "~/services/database/repos";

export const OrderModule = createModule({
  id: "order-module",
  dirname: __dirname,
  providers: [
    ProductRepositoryProvider,
    UserRepositoryProvider,
    OrderRepositoryProvider,
    ProductServiceProvider,
    UserServiceProvider,
  ],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./*resolvers.ts")),
});
