import { InjectionToken, Provider } from "graphql-modules";
import { createClient, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "redis";
export const redisConfig = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
};

export type IRedisService = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export const RedisServiceToken = new InjectionToken<RedisClientType>("RedisService");

export const RedisServiceProvider: Provider<IRedisService> = {
  provide: RedisServiceToken,
  useValue: createClient(redisConfig),
};
