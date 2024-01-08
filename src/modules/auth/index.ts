import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

export const authModule = createModule({
  id: "auth-module",
  dirname: __dirname,
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
});
