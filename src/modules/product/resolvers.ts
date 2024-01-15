import { ProductServiceProvider } from "services";
import { Resolvers } from "types/graphql";

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

      return await productService.createProduct(productInfo);
    },
    updateProduct: async (_parent, { id, productInfo }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.updateProduct(Number(id), productInfo);

      return true;
    },
    deleteProduct: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.deleteProduct(Number(id));

      return true;
    },
  },
};
