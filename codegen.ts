import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/modules/**/*.gql",
  generates: {
    "./src/types/": {
      config: {
        scalars: {
          DateTime: "string",
        },
      },
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../types/graphql.ts",
        filename: "types/module-types.ts",
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
