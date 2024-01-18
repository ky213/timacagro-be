import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ProductServiceProvider } from "~/services";
import { ProductRepositoryProvider } from "~/services/database/repos";

export const ProductlModule = createModule({
  id: "product-module",
  dirname: __dirname,
  providers: [ProductRepositoryProvider, ProductServiceProvider],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts")),
});
