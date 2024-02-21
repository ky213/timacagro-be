import { ERRORS } from "~/config";
import { ClientServiceProvider, OrderServiceProvider, ProductServiceProvider, UserServiceProvider } from "~/services";
import { HttpError } from "~/shared/utils/error-handler";
import { Client, Order, OrderItem, OrderItemInput, Product, Resolvers, User } from "~/types/graphql";

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
    createOrder: async (_parent, { orderInfo }, { injector, session, pubSub }) => {
      const clientService = injector.get(ClientServiceProvider);
      const orderService = injector.get(OrderServiceProvider);
      const productService = injector.get(ProductServiceProvider);
      const client = await clientService.getClientById(orderInfo.clientId);

      if (!client) throw new HttpError(404, "client not found", ERRORS.USER_NOT_FOUND);

      // check product availability
      const unavailabeItem = await productService.chechAvailability(orderInfo.items);

      if (unavailabeItem)
        throw new HttpError(400, `Product ${unavailabeItem} or quantity is unavailable.`, ERRORS.UNAVAILABLE_PRODUCT);

      const order = await orderService.createOrder(orderInfo, client, session.user);

      // TODO: Updated user points

      pubSub.publish("order:created", { order });

      return order;
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
    items: async (root, _, { injector }) => {
      const productSerivce = injector.get(ProductServiceProvider);
      const items = root.items as (OrderItemInput & OrderItem)[];

      return items.map(async ({ productId, quantity }) => {
        return {
          quantity,
          product: (await productSerivce.getProductById(productId)) as Product,
        };
      });
    },
  },
  Subscription: {
    orderCreated: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("order:created"),
      resolve: (payload: { order: Order }) => payload.order,
    },
  },
};
