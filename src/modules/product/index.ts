import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ProductServiceProvider, UserServiceProvider } from "~/services";
import { ProductRepositoryProvider, UserRepositoryProvider } from "~/services/database/repos";

export const ProductlModule = createModule({
  id: "product-module",
  dirname: __dirname,
  providers: [ProductRepositoryProvider, UserRepositoryProvider, ProductServiceProvider, UserServiceProvider],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts")),
});
