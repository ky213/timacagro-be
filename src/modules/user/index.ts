import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { UserRepositoryProvider } from "~/services/database/repos";
import { UserServiceProvider } from "~/services";

export const UserModule = createModule({
  id: "user-module",
  dirname: __dirname,
  providers: [UserRepositoryProvider, UserServiceProvider],
  typeDefs: loadFilesSync(join(__dirname, "./*.gql")),
  resolvers: loadFilesSync(join(__dirname, "./*resolvers.ts")),
});
