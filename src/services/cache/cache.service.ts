import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IRedisService, RedisServiceToken } from "config";

@Injectable({ global: true })
export class CacheServiceProvider {
  constructor(@Inject(forwardRef(() => RedisServiceToken)) private redisService: IRedisService) {
    this.init();
  }

  async init() {
    try {
      this.redisService = await this.redisService.connect();

      console.log("Redis connected ", this.redisService.isReady);
    } catch (error) {
      console.error("Redis failed to connect", error.message);
      // process.exit(1);
    }
  }

  async get(key: string) {
    return this.redisService.get(key);
  }

  async set(key: string, value: string, expiration: number) {
    return this.redisService.set(key, value, { EX: expiration });
  }

  async delete(key: string) {
    return this.redisService.del(key);
  }
}
