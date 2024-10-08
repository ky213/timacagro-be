import { createPubSub } from "graphql-yoga";

export type ITopics = {
  // Global events
  "global:test_connection": [];
  "global:random_number": [random: number];
  "event:payload:obj": [payload: { foo: number }];
};

export const pubSub = createPubSub<ITopics>();
