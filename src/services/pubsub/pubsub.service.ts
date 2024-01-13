import { InjectionToken, Provider } from "graphql-modules";
import { PubSub, createPubSub } from "graphql-yoga";

type PubSubPublishArgsByKey = {
  [key: string]: [] | [any] | [number | string, any];
};

export const PubsubServiceToken = new InjectionToken<PubSub<PubSubPublishArgsByKey>>("PubSub");

export const PubSubServiceProvider: Provider<PubSub<PubSubPublishArgsByKey>> = {
  provide: PubsubServiceToken,
  useValue: createPubSub(),
};
