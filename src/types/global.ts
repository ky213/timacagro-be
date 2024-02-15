import { CookieStore } from "@whatwg-node/cookie-store";
import { PubSub } from "graphql-yoga";
import { RedisClientType } from "redis";

import { ITopics } from "~/config";
import { User } from "./graphql";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace GraphQLModules {
    interface Session extends JwtPayload {
      user: User;
    }
    interface GlobalContext {
      request: HttpREquest;
      pubSub: PubSub<ITopics>;
      cache: RedisClientType;
      session: Session;
    }
  }

  type Nil<T> = T | null | undefined;
}

interface HttpREquest extends Request {
  cookieStore?: CookieStore;
}

export enum Role {
  ADMIN = "ADMIN",
  DR = "DR",
  ATC = "ATC",
  SALES = "SALES",
  COMMERCE = "COMMERCE",
}

export enum ProductType {
  LIQUID = "LIQUID",
  SOLID = "SOLID",
  GAS = "GAS",
}

export enum Region {
  CENTER = "CENTER",
  CENTER_EAST = "CENTER_EAST",
  NORTH_WEST = "NORTH_WEST",
  FAR_WEST = "FAR_WEST",
  NORTH_EAST = "NORTH_EAST",
  SOUTH_EAST = "SOUTH_EAST",
  FAR_EAST = "FAR_EAST",
  DEV_ZONE_SOUTH = "DEV_ZONE_SOUTH",
}

export type File = typeof File;
