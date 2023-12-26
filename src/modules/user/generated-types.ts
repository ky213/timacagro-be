/* eslint-disable */
import * as Types from "../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    User: 'id' | 'firstName' | 'lastName' | 'email' | 'Role';
    Query: 'hello';
  };
  
  interface DefinedEnumValues {
    ROLE: 'ADMIN' | 'ATC' | 'SALES' | 'COMMERCE';
  };
  
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type ROLE = DefinedEnumValues['ROLE'];
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    User?: UserResolvers;
    Query?: QueryResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      firstName?: gm.Middleware[];
      lastName?: gm.Middleware[];
      email?: gm.Middleware[];
      Role?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      hello?: gm.Middleware[];
    };
  };
}