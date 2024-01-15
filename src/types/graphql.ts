/* eslint-disable */
import { ROLE_ENUM } from './global';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateProductInput = {
  points: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type CreateUserInput = {
  active: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: ROLE_ENUM;
};

export type Entity = {
  __typename?: 'Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail?: Maybe<Scalars['Boolean']['output']>;
  createProduct: Product;
  createUser: User;
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  forgotPassword?: Maybe<Scalars['String']['output']>;
  login?: Maybe<Scalars['Boolean']['output']>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  randomize: Scalars['Float']['output'];
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  updateProduct: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  productInfo: CreateProductInput;
};


export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  userInfo: UpdateUserInput;
};

export type Pagination = {
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductsList = Pagination & {
  __typename?: 'ProductsList';
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  users: Array<Maybe<Product>>;
};

export type Query = {
  __typename?: 'Query';
  getDateTime: Scalars['DateTime']['output'];
  getProduct?: Maybe<Product>;
  getUser?: Maybe<User>;
  listProducts: ProductsList;
  listUsers: UsersList;
};


export type QueryGetProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListProductsArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListUsersArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};

export { ROLE_ENUM };

export type Subscription = {
  __typename?: 'Subscription';
  randomNumber: Scalars['Float']['output'];
  testConnection: Scalars['Int']['output'];
};

export type UpdateProductInput = {
  points?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<ROLE_ENUM>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailConfirmed: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: ROLE_ENUM;
  updatedAt: Scalars['DateTime']['output'];
};

export type UsersList = Pagination & {
  __typename?: 'UsersList';
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  users: Array<Maybe<User>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Pagination: ( ProductsList ) | ( UsersList );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateProductInput: CreateProductInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Entity: ResolverTypeWrapper<Entity>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Pagination']>;
  Product: ResolverTypeWrapper<Product>;
  ProductsList: ResolverTypeWrapper<ProductsList>;
  Query: ResolverTypeWrapper<{}>;
  ROLE_ENUM: ROLE_ENUM;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UsersList: ResolverTypeWrapper<UsersList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateProductInput: CreateProductInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Entity: Entity;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Pagination: ResolversInterfaceTypes<ResolversParentTypes>['Pagination'];
  Product: Product;
  ProductsList: ProductsList;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UsersList: UsersList;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  confirmEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationConfirmEmailArgs, 'token'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInfo'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInfo'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  login?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  randomize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'token'>>;
  updateProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'productInfo'>>;
  updateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'userInfo'>>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  __resolveType: TypeResolveFn<'ProductsList' | 'UsersList', ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsList'] = ResolversParentTypes['ProductsList']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  listProducts?: Resolver<ResolversTypes['ProductsList'], ParentType, ContextType, RequireFields<QueryListProductsArgs, 'page' | 'perPage'>>;
  listUsers?: Resolver<ResolversTypes['UsersList'], ParentType, ContextType, RequireFields<QueryListUsersArgs, 'page' | 'perPage'>>;
};

export type Role_EnumResolvers = EnumResolverSignature<{ ADMIN?: any, ATC?: any, COMMERCE?: any, SALES?: any }, ResolversTypes['ROLE_ENUM']>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  randomNumber?: SubscriptionResolver<ResolversTypes['Float'], "randomNumber", ParentType, ContextType>;
  testConnection?: SubscriptionResolver<ResolversTypes['Int'], "testConnection", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailConfirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['ROLE_ENUM'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersList'] = ResolversParentTypes['UsersList']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Entity?: EntityResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductsList?: ProductsListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ROLE_ENUM?: Role_EnumResolvers;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
};


export type DateTime = Scalars["DateTime"];