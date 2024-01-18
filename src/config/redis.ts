import { InjectionToken, Provider } from "graphql-modules";
import { createClient, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "redis";
import { logger } from "~/shared/utils/logger";

export const redisConfig = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "18385"),
  },
};

export type IRedisService = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export const RedisServiceToken = new InjectionToken<RedisClientType>("RedisService");

export const redisClient = createClient(redisConfig);

export const RedisServiceProvider: Provider<IRedisService> = {
  provide: RedisServiceToken,
  useValue: redisClient,
};

export const initCache = async () => {
  try {
    const cache = await redisClient.connect();

    logger.info(`Cache server connected.`);

    return cache;
  } catch (error) {
    logger.error("Redis failed to connect: ", error);
  }
};
