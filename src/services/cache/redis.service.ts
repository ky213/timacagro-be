import { createClient, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "redis";
import { InjectionToken, Provider } from "graphql-modules";

import { redisConfig } from "config/redis";

export type IRedisService = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export const RedisServiceToken = new InjectionToken<RedisClientType>("RedisService");

export const RedisServiceProvider: Provider<Promise<IRedisService>> = {
  provide: RedisServiceToken,
  useFactory: async () => {
    try {
      const redisClient = await createClient(redisConfig).connect();

      console.info("Redis connected.");

      return redisClient;
    } catch (error) {
      console.error("Redis failed to connect: ", error.message);

      return null;
    }
  },
};
