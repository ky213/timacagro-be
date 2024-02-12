import { ClientServiceProvider } from "~/services";
import { CreateClientInput, Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getClient: async (_parent, { id }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);

      return await clientService.getClientById(Number(id));
    },
    listClients: async (_parent, { page = 0, perPage = 10 }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);
      return await clientService.listClients(page, perPage);
    },
  },
  Mutation: {
    createClient: async (_parent, { clientInfo }, { injector }) => {
      const clienttService = injector.get(ClientServiceProvider);

      return await clienttService.createClient(clientInfo);
    },
    updateClient: async (_parent, { id, clientInfo }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);
      //@ts-ignore TODO:fix types
      await clientService.updateClient(Number(id), clientInfo);

      return true;
    },
    deleteClient: async (_parent, { id }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);

      await clientService.deleteClient(Number(id));

      return true;
    },
  },
};
