import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { DateTimeTypeDefinition } from "graphql-scalars";
import { join } from "path";

export const globalModule = createModule({
  id: "global-module",
  dirname: __dirname,
  typeDefs: [...loadFilesSync(join(__dirname, "./*.gql"))],
});
