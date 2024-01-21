import { InvoiceServiceProvider } from "~/services";
import { Resolvers } from "~/types/graphql";

export const resolvers: Resolvers<GraphQLModules.ModuleContext> = {
  Query: {
    getInvoice: async (_parent, { id }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);

      return await productService.getInvoiceById(Number(id));
    },
    listInvoices: async (_parent, { page = 0, perPage = 10 }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);
      return await productService.listInvoices(page, perPage);
    },
  },
  Mutation: {
    createInvoice: async (_parent, { productInfo }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);
      //@ts-ignore TODO:fix types
      return await productService.createInvoice(productInfo);
    },
    updateInvoice: async (_parent, { id, productInfo }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);
      //@ts-ignore TODO:fix types
      await productService.updateInvoice(Number(id), productInfo);

      return true;
    },
    deleteInvoice: async (_parent, { id }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);

      await productService.deleteInvoice(Number(id));

      return true;
    },
  },
};
