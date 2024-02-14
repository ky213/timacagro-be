import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { InvoiceServiceProvider } from "~/services";
import { InvoiceRepositoryProvider } from "~/services/database/repos";

export const InvoicelModule = createModule({
  id: "invoice-module",
  dirname: __dirname,
  providers: [InvoiceRepositoryProvider, InvoiceServiceProvider],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./*resolvers.ts")),
});
