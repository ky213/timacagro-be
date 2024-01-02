import { GraphQLError } from "graphql";

import { UserRepository } from "services/database/repositrories/user.repository";
import { Resolvers } from "generated-types/graphql";
import { HttpError } from "shared/utils/error-handler";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    //@ts-ignore
    hello: async (_parent, _args, context) => {
      const user = context.injector.get(UserRepository);
      throw new HttpError(404, "New Errorr");
      return await user.getCount();
    },
  },
};
