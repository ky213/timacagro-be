import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { ClientServiceProvider } from "~/services";
import { ClientRepositoryProvider } from "~/services/database/repos";

export const ClientlModule = createModule({
  id: "client-module",
  dirname: __dirname,
  providers: [ClientRepositoryProvider, ClientServiceProvider],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./*.resolvers.ts")),
});
