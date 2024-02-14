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
    createInvoice: async (_parent, { invoiceInfo }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);

      return await productService.createInvoice(invoiceInfo);
    },
    updateInvoice: async (_parent, { id, invoiceInfo }, { injector }) => {
      const invoiceService = injector.get(InvoiceServiceProvider);

      await invoiceService.updateInvoice(Number(id), invoiceInfo);

      return true;
    },
    deleteInvoice: async (_parent, { id }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);

      await productService.deleteInvoice(Number(id));

      return true;
    },
    restoreInvoice: async (_parent, { id }, { injector }) => {
      const productService = injector.get(InvoiceServiceProvider);

      await productService.restoreInvoice(id);

      return true;
    },
  },
};
