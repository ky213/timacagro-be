import { ProductServiceProvider } from "~/services";
import { CreateProductInput, OrderProductsOutput, Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getProduct: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      return await productService.getProductById(Number(id));
    },
    listProducts: async (_parent, { page = 0, perPage = 10 }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);
      return await productService.listProducts(page, perPage);
    },
  },
  Mutation: {
    createProduct: async (_parent, { productInfo }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);
      //@ts-ignore TODO:fix types
      return await productService.createProduct(productInfo);
    },
    importProducts: async (_parent, { productsList }, { injector, pubSub }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.importProducts({ products: productsList.products });

      pubSub.publish("products:order", { products: productsList.products });

      return true;
    },
    updateProduct: async (_parent, { id, productInfo }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);
      //@ts-ignore TODO:fix types
      await productService.updateProduct(Number(id), productInfo);

      return true;
    },
    deleteProduct: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.deleteProduct(Number(id));

      return true;
    },
  },
  Subscription: {
    orderProducts: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("products:order"),
      resolve: (payload: { products: OrderProductsOutput[] }) => payload.products,
    },
  },
};
