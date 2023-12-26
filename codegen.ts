import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/modules/**/*.gql",
  generates: {
    "./src/types/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated-types/graphql.ts",
        filename: "generated-types/module-types.ts",
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
