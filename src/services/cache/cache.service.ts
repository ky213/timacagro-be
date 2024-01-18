import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IRedisService, RedisServiceToken } from "~/config";

@Injectable({ global: true })
export class CacheServiceProvider {
  constructor(@Inject(forwardRef(() => RedisServiceToken)) private redisService: IRedisService) {}

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
