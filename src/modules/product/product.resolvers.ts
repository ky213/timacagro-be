import { ProductServiceProvider, UserServiceProvider } from "~/services";
import { CreateProductInput, Product, Resolvers } from "~/types/graphql";

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
    importProducts: async (_parent, { productsList }, { injector, pubSub }) => {
      const productService = injector.get(ProductServiceProvider);

      const importedProducts = await productService.importProducts(productsList);

      pubSub.publish("products:imported", { products: importedProducts });

      return importedProducts;
    },
    updateProduct: async (_parent, { id, productInfo }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.updateProduct(Number(id), productInfo as Partial<CreateProductInput>);

      return true;
    },
    deleteProduct: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.deleteProduct(Number(id));

      return true;
    },
    restoreProduct: async (_parent, { id }, { injector }) => {
      const productService = injector.get(ProductServiceProvider);

      await productService.restoreProduct(id);

      return true;
    },
  },
  Subscription: {
    productsImported: {
      subscribe: (_root, _args, { pubSub }) => pubSub.subscribe("products:imported"),
      resolve: (payload: { products: Product[] }) => payload.products,
    },
  },
};
