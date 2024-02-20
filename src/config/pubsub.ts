import { createPubSub } from "graphql-yoga";
import { Order, OrderProductsOutput } from "~/types/graphql";

export type ITopics = {
  // Global events
  "global:test_connection": [];
  "global:random_number": [random: number];
  "products:order": [payload: { products: OrderProductsOutput[] }];
  "order:created": [payload: { order: Order }];
  "event:payload:obj": [payload: { foo: number }];
};

export const pubSub = createPubSub<ITopics>();
