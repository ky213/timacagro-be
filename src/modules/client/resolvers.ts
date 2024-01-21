import { ClientServiceProvider } from "~/services";
import { Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getClient: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ClientServiceProvider);

      return await productService.getClientById(Number(id));
    },
    listClients: async (_parent, { page = 0, perPage = 10 }, { injector }) => {
      const productService = injector.get(ClientServiceProvider);
      return await productService.listClients(page, perPage);
    },
  },
  Mutation: {
    createClient: async (_parent, { productInfo }, { injector }) => {
      const productService = injector.get(ClientServiceProvider);
      //@ts-ignore TODO:fix types
      return await productService.createClient(productInfo);
    },
    updateClient: async (_parent, { id, productInfo }, { injector }) => {
      const productService = injector.get(ClientServiceProvider);
      //@ts-ignore TODO:fix types
      await productService.updateClient(Number(id), productInfo);

      return true;
    },
    deleteClient: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ClientServiceProvider);

      await productService.deleteClient(Number(id));

      return true;
    },
  },
};
