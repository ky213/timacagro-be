import { createModule, InjectionToken } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

import { UserRepository } from "data-sources/database/repositrories/user.repository";
import { UserServiceProvider } from "data-sources/database/entities/user.entity";

export const userModule = createModule({
  id: "user-module",
  dirname: __dirname,
  providers: [UserRepository, UserServiceProvider],
  typeDefs: loadFilesSync(join(__dirname, "./*.gql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts")),
});
