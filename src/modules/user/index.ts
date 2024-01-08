import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { UserRepositoryProvider } from "services/database/repos";

export const UserModule = createModule({
  id: "user-module",
  dirname: __dirname,
  providers: [UserRepositoryProvider],
  typeDefs: loadFilesSync(join(__dirname, "./*.gql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts")),
});
