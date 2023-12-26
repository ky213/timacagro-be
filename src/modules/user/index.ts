import { createModule, InjectionToken } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { User } from "data-sources/database/user";

export const ApiKey = new InjectionToken<string>("api-key");

export const userModule = createModule({
  id: "user-module",
  dirname: __dirname,
  providers: [User, { provide: ApiKey, useValue: "Test_API" }],
  typeDefs: loadFilesSync(join(__dirname, "./*.gql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers.ts")),
});
