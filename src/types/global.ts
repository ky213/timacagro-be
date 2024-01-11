import { CookieStore } from "@whatwg-node/cookie-store";

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      request: HttpREquest;
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
