import { OrderServiceProvider, UserServiceProvider } from "~/services";
import { CreateOrderInput, OrderOrdersOutput, Resolvers } from "~/types/graphql";

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
      //@ts-ignore TODO:fix types
      return await orderService.createOrder(orderInfo);
    },
    importOrders: async (_parent, { ordersList, userPoints }, { injector, pubSub, currentUser }) => {
      const orderService = injector.get(OrderServiceProvider);
      const userService = injector.get(UserServiceProvider);

      await orderService.importOrders({ orders: ordersList.orders });

      if (userPoints && currentUser) {
        const user = await userService.getUserByEmail(currentUser.email);
        if (user)
          await userService.updateUser(user?.id, {
            currentPoints: (currentUser?.currentPoints || 0) + userPoints,
          });
      }

      pubSub.publish("orders:order", { orders: ordersList.orders });

      return true;
    },
    updateOrder: async (_parent, { id, orderInfo }, { injector }) => {
      const orderService = injector.get(OrderServiceProvider);
      //@ts-ignore TODO:fix types
      await orderService.updateOrder(Number(id), orderInfo);

      return true;
    },
    deleteOrder: async (_parent, { id }, { injector }) => {
      const orderService = injector.get(OrderServiceProvider);

      await orderService.deleteOrder(Number(id));

      return true;
    },
    restoreOrder: async (_parent, { id }, { injector }) => {
      const orderService = injector.get(OrderServiceProvider);

      await orderService.restoreOrder(id);

      return true;
    },
  },
  Subscription: {
    orderOrders: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("orders:order"),
      resolve: (payload: { orders: OrderOrdersOutput[] }) => payload.orders,
    },
  },
};
