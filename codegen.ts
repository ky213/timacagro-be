import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/modules/**/*.gql",
  generates: {
    "./src/types/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../types/graphql.ts",
        filename: "types/module-types.ts",
      },
      config: {
        enumValues: {
          ROLE_ENUM: "./global#ROLE_ENUM",
        },
      },
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
    },
  },
};
export default config;
