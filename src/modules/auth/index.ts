import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { UserServiceProvider } from "~/services";
import { UserRepositoryProvider } from "~/services/database/repos";

export const AuthModule = createModule({
  id: "auth-module",
  dirname: __dirname,
  providers: [UserRepositoryProvider, UserServiceProvider],
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
  resolvers: loadFilesSync(join(__dirname, "./*resolvers.ts")),
});
