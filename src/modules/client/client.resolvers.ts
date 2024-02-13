import { ERRORS } from "~/config";
import { ClientServiceProvider } from "~/services";
import { HttpError } from "~/shared/utils/error-handler";
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
      const clientService = injector.get(ClientServiceProvider);

      clientInfo.files.forEach((file) => (file!._size = file.size));

      return await clientService.createClient(clientInfo);
    },
    updateClient: async (_parent, { id, clientInfo }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);
      const client = await clientService.getClientById(Number(id));

      if (!client) throw new HttpError(404, "Client doesn't exist or deleted", ERRORS.USER_NOT_FOUND);

      await clientService.updateClient(client, clientInfo);

      return true;
    },
    deleteClient: async (_parent, { id }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);

      await clientService.deleteClient(Number(id));

      return true;
    },
  },
};
