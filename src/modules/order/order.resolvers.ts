import { OrderServiceProvider, UserServiceProvider } from "~/services";
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
      const orderService = injector.get(OrderServiceProvider);
      return await orderService.createOrder(orderInfo);
    },
  },
};
