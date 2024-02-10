import fs from "fs";
import path from "path";
import { DateTimeResolver } from "graphql-scalars";

import { Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getDateTime() {
      return new Date().toISOString();
    },
  },
  Mutation: {
    randomize: (_root, _args, { pubSub }) => {
      const random = Math.random();
      pubSub.publish("global:random_number", random);
      return random;
    },
    readTextFile: async (_, { file }: { file: File }) => {
      const fileContent = await file.text();

      return fileContent;
    },
    saveFile: async (_, { file }) => {
      try {
        const fileArrayBuffer = await file.arrayBuffer();
        await fs.promises.writeFile(
          path.join(__dirname + "/../../../uploads/", file.name),
          Buffer.from(fileArrayBuffer)
        );
      } catch (e) {
        return false;
      }
      return true;
    },
  },
  Subscription: {
    testConnection: {
      subscribe: async function* (_root, _args, { pubSub }) {
        for (let i = 30; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          yield i;
        }
      },
      resolve: (payload: number) => payload,
    },
    randomNumber: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("global:random_number"),
      resolve: (payload: number) => payload,
    },
  },
  DateTime: DateTimeResolver,
};
