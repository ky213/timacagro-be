import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IInvoiceRepository, InvoiceEntity, InvoiceRepositoryToken } from "../repos";
import { CreateInvoiceInput, Invoice, InvoicesList, UpdateInvoiceInput } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS } from "~/config";
import { InvoiceSchema } from "~/types/schemas/";

@Injectable()
export class InvoiceServiceProvider {
  constructor(@Inject(forwardRef(() => InvoiceRepositoryToken)) private invoiceRepo: IInvoiceRepository) {}

  async getInvoiceById(id: number): Promise<Invoice | null> {
    return await this.invoiceRepo.findOneBy({ id });
  }

  async listInvoices(page: number, perPage: number): Promise<InvoicesList> {
    const [invoices, total] = await this.invoiceRepo.findAndCount({ skip: page, take: perPage });

    return {
      invoices,
      page,
      perPage,
      total,
    };
  }

  async createInvoice(newInvoice: CreateInvoiceInput): Promise<Invoice> {
    const errors = validateData<CreateInvoiceInput>(InvoiceSchema, newInvoice);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check invoice exists
    const invoiceExists = await this.invoiceRepo.findOneBy({ number: newInvoice.number });

    if (invoiceExists) throw new HttpError(400, "Invoice with this number exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save invoice
    const invoice = this.invoiceRepo.create(newInvoice);

    await this.invoiceRepo.save(invoice);

    return invoice;
  }

  async updateInvoice(id: number, invoiceData: UpdateInvoiceInput): Promise<Boolean> {
    const errors = validateData<UpdateInvoiceInput>(InvoiceSchema, invoiceData);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    await this.invoiceRepo.update({ id }, invoiceData);

    return true;
  }

  async deleteInvoice(id: number): Promise<Boolean> {
    await this.invoiceRepo.softDelete({ id });

    return true;
  }

  async restoreInvoice(id: number): Promise<Boolean> {
    await this.invoiceRepo.restore({ id });

    return true;
  }
}
