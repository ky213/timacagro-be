/* eslint-disable */
import { Role } from './global';
import { Region } from './global';
import { ProductType } from './global';
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
  File: { input: any; output: any; }
};

export type Client = {
  __typename?: 'Client';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  files: Array<Maybe<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientsList = Pagination & {
  __typename?: 'ClientsList';
  clients: Array<Maybe<Client>>;
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CreateClientInput = {
  files: Array<InputMaybe<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateInvoiceInput = {
  client: Scalars['String']['input'];
  number: Scalars['String']['input'];
  payed: Scalars['Boolean']['input'];
  total: Scalars['Float']['input'];
};

export type CreateProductInput = {
  active: Scalars['Boolean']['input'];
  available: Scalars['Float']['input'];
  label: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
  type: ProductType;
};

export type CreateUserInput = {
  active: Scalars['Boolean']['input'];
  currentPoints?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  region?: InputMaybe<Region>;
  role: Role;
  targetPoints?: InputMaybe<Scalars['Int']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImportProductsInput = {
  products: Array<CreateProductInput>;
};

export type Invoice = {
  __typename?: 'Invoice';
  client: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  number: Scalars['String']['output'];
  payed: Scalars['Boolean']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InvoicesList = Pagination & {
  __typename?: 'InvoicesList';
  invoices: Array<Maybe<Invoice>>;
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail?: Maybe<Scalars['Boolean']['output']>;
  createClient: Client;
  createInvoice: Invoice;
  createProduct: Product;
  createUser: User;
  deleteClient: Scalars['Boolean']['output'];
  deleteInvoice: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  forgotPassword?: Maybe<Scalars['String']['output']>;
  importProducts: Scalars['Boolean']['output'];
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  randomize: Scalars['Float']['output'];
  readTextFile: Scalars['String']['output'];
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  saveFile: Scalars['Boolean']['output'];
  updateClient: Scalars['Boolean']['output'];
  updateInvoice: Scalars['Boolean']['output'];
  updateProduct: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateClientArgs = {
  productInfo: CreateClientInput;
};


export type MutationCreateInvoiceArgs = {
  productInfo: CreateInvoiceInput;
};


export type MutationCreateProductArgs = {
  productInfo: CreateProductInput;
};


export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInvoiceArgs = {
  id: Scalars['ID']['input'];
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


export type MutationImportProductsArgs = {
  productsList: ImportProductsInput;
  userPoints?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationReadTextFileArgs = {
  file: Scalars['File']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSaveFileArgs = {
  file: Scalars['File']['input'];
};


export type MutationUpdateClientArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateClientInput;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateInvoiceInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  userInfo: UpdateUserInput;
};

export type OrderProductsOutput = {
  __typename?: 'OrderProductsOutput';
  available: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Pagination = {
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type Product = {
  __typename?: 'Product';
  active: Scalars['Boolean']['output'];
  available: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export { ProductType };

export type ProductsList = Pagination & {
  __typename?: 'ProductsList';
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  products: Array<Maybe<Product>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getClient?: Maybe<Client>;
  getDateTime: Scalars['DateTime']['output'];
  getInvoice?: Maybe<Invoice>;
  getProduct?: Maybe<Product>;
  getSession?: Maybe<User>;
  getUser?: Maybe<User>;
  listClients: ClientsList;
  listInvoices: InvoicesList;
  listProducts: ProductsList;
  listUsers: UsersList;
};


export type QueryGetClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListClientsArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListInvoicesArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListProductsArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListUsersArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};

export { Region };

export { Role };

export type Subscription = {
  __typename?: 'Subscription';
  orderProducts: Array<OrderProductsOutput>;
  randomNumber: Scalars['Float']['output'];
  testConnection: Scalars['Int']['output'];
};

export type UpdateClientInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInvoiceInput = {
  client: Scalars['String']['input'];
  number: Scalars['String']['input'];
  payed: Scalars['Boolean']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateProductInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  available?: InputMaybe<Scalars['Float']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<ProductType>;
};

export type UpdateUserInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  currentPoints?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Region>;
  role?: InputMaybe<Role>;
  targetPoints?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentPoints?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  emailConfirmed: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Region>;
  role: Role;
  targetPoints?: Maybe<Scalars['Int']['output']>;
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
  Pagination: ( ClientsList ) | ( InvoicesList ) | ( ProductsList ) | ( UsersList );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Client: ResolverTypeWrapper<Client>;
  ClientsList: ResolverTypeWrapper<ClientsList>;
  CreateClientInput: CreateClientInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateProductInput: CreateProductInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Entity: ResolverTypeWrapper<Entity>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImportProductsInput: ImportProductsInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoicesList: ResolverTypeWrapper<InvoicesList>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderProductsOutput: ResolverTypeWrapper<OrderProductsOutput>;
  Pagination: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Pagination']>;
  Product: ResolverTypeWrapper<Product>;
  ProductType: ProductType;
  ProductsList: ResolverTypeWrapper<ProductsList>;
  Query: ResolverTypeWrapper<{}>;
  Region: Region;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateClientInput: UpdateClientInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UsersList: ResolverTypeWrapper<UsersList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Client: Client;
  ClientsList: ClientsList;
  CreateClientInput: CreateClientInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateProductInput: CreateProductInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Entity: Entity;
  File: Scalars['File']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  ImportProductsInput: ImportProductsInput;
  Int: Scalars['Int']['output'];
  Invoice: Invoice;
  InvoicesList: InvoicesList;
  Mutation: {};
  OrderProductsOutput: OrderProductsOutput;
  Pagination: ResolversInterfaceTypes<ResolversParentTypes>['Pagination'];
  Product: Product;
  ProductsList: ProductsList;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateClientInput: UpdateClientInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UsersList: UsersList;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  files?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientsList'] = ResolversParentTypes['ClientsList']> = {
  clients?: Resolver<Array<Maybe<ResolversTypes['Client']>>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  client?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoicesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoicesList'] = ResolversParentTypes['InvoicesList']> = {
  invoices?: Resolver<Array<Maybe<ResolversTypes['Invoice']>>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  confirmEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationConfirmEmailArgs, 'token'>>;
  createClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'productInfo'>>;
  createInvoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'productInfo'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInfo'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInfo'>>;
  deleteClient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'id'>>;
  deleteInvoice?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteInvoiceArgs, 'id'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  importProducts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationImportProductsArgs, 'productsList'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  randomize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  readTextFile?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationReadTextFileArgs, 'file'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'token'>>;
  saveFile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveFileArgs, 'file'>>;
  updateClient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'id' | 'productInfo'>>;
  updateInvoice?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceArgs, 'id' | 'productInfo'>>;
  updateProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'productInfo'>>;
  updateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'userInfo'>>;
};

export type OrderProductsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderProductsOutput'] = ResolversParentTypes['OrderProductsOutput']> = {
  available?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  __resolveType: TypeResolveFn<'ClientsList' | 'InvoicesList' | 'ProductsList' | 'UsersList', ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  available?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProductType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTypeResolvers = EnumResolverSignature<{ GAS?: any, LIQUID?: any, SOLID?: any }, ResolversTypes['ProductType']>;

export type ProductsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsList'] = ResolversParentTypes['ProductsList']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryGetClientArgs, 'id'>>;
  getDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  getInvoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType, RequireFields<QueryGetInvoiceArgs, 'id'>>;
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'id'>>;
  getSession?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  listClients?: Resolver<ResolversTypes['ClientsList'], ParentType, ContextType, RequireFields<QueryListClientsArgs, 'page' | 'perPage'>>;
  listInvoices?: Resolver<ResolversTypes['InvoicesList'], ParentType, ContextType, RequireFields<QueryListInvoicesArgs, 'page' | 'perPage'>>;
  listProducts?: Resolver<ResolversTypes['ProductsList'], ParentType, ContextType, RequireFields<QueryListProductsArgs, 'page' | 'perPage'>>;
  listUsers?: Resolver<ResolversTypes['UsersList'], ParentType, ContextType, RequireFields<QueryListUsersArgs, 'page' | 'perPage'>>;
};

export type RegionResolvers = EnumResolverSignature<{ CENTER?: any, CENTER_EAST?: any, DEV_ZONE_SOUTH?: any, FAR_EAST?: any, FAR_WEST?: any, NORTH_EAST?: any, NORTH_WEST?: any, SOUTH_EAST?: any }, ResolversTypes['Region']>;

export type RoleResolvers = EnumResolverSignature<{ ADMIN?: any, ATC?: any, COMMERCE?: any, DR?: any, SALES?: any }, ResolversTypes['Role']>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  orderProducts?: SubscriptionResolver<Array<ResolversTypes['OrderProductsOutput']>, "orderProducts", ParentType, ContextType>;
  randomNumber?: SubscriptionResolver<ResolversTypes['Float'], "randomNumber", ParentType, ContextType>;
  testConnection?: SubscriptionResolver<ResolversTypes['Int'], "testConnection", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currentPoints?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailConfirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  targetPoints?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  Client?: ClientResolvers<ContextType>;
  ClientsList?: ClientsListResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entity?: EntityResolvers<ContextType>;
  File?: GraphQLScalarType;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoicesList?: InvoicesListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrderProductsOutput?: OrderProductsOutputResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductType?: ProductTypeResolvers;
  ProductsList?: ProductsListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers;
  Role?: RoleResolvers;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
};


export type DateTime = Scalars["DateTime"];
export type File = Scalars["File"];