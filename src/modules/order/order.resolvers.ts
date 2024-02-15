import { ERRORS } from "~/config";
import { ClientServiceProvider, OrderServiceProvider, UserServiceProvider } from "~/services";
import { HttpError } from "~/shared/utils/error-handler";
import { CreateOrderInput, Resolvers } from "~/types/graphql";

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
    createOrder: async (_parent, { orderInfo }, { injector }) => {
      const clientService = injector.get(ClientServiceProvider);
      const orderService = injector.get(OrderServiceProvider);

      const client = clientService.getClientById(orderInfo.clientId);

      if (!client) throw new HttpError(404, "client not found", ERRORS.USER_NOT_FOUND);

      return await orderService.createOrder(orderInfo);
    },
  },
};
