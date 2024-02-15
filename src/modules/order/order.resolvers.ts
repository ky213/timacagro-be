import { ERRORS } from "~/config";
import { ClientServiceProvider, OrderServiceProvider, UserServiceProvider } from "~/services";
import { HttpError } from "~/shared/utils/error-handler";
import { Client, CreateOrderInput, Resolvers, User } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getOrder: async (_parent, { id }, { injector }) => {
      const orderService = injector.get(OrderServiceProvider);

      return await orderService.getOrderById(Number(id));
    },
    listOrders: async (_parent, { page = 0, perPage = 10 }, { injector }) => {
      const orderService = injector.get(OrderServiceProvider);
      return await orderService.listOrders(page, perPage);
    },
  },
  Mutation: {
    createOrder: async (_parent, { orderInfo }, { injector, session }) => {
      const clientService = injector.get(ClientServiceProvider);
      const orderService = injector.get(OrderServiceProvider);

      const client = await clientService.getClientById(orderInfo.clientId);

      if (!client) throw new HttpError(404, "client not found", ERRORS.USER_NOT_FOUND);

      return await orderService.createOrder(orderInfo, client, session.user);
    },
  },
  Order: {
    client: async ({ client }, _, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);
      const result = (await clientService.getClientById(client.id)) as Client;

      return result;
    },
    user: async ({ user }, _, { injector }) => {
      const userSerivce = injector.get(UserServiceProvider);
      const result = (await userSerivce.getUserById(user.id)) as User;

      return result;
    },
  },
};
