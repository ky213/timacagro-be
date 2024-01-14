import { CookieStore } from "@whatwg-node/cookie-store";
import { PubSub } from "graphql-yoga";
import { RedisClientType } from "redis";

import { ITopics } from "config";

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      request: HttpREquest;
      pubSub: PubSub<ITopics>;
      cache: RedisClientType;
    }
  }
}

interface HttpREquest extends Request {
  cookieStore?: CookieStore;
}

export enum ROLE_ENUM {
  ADMIN = "ADMIN",
  ATC = "ATC",
  SALES = "SALES",
  COMMERCE = "COMMERCE",
}
