import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IClientRepository, ClientEntity, ClientRepositoryToken } from "../repos";
import { CreateClientInput, Client, ClientsList, UpdateClientInput } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS } from "~/config";
import { ClientSchema } from "~/types/schemas/";

@Injectable()
export class ClientServiceProvider {
  constructor(@Inject(forwardRef(() => ClientRepositoryToken)) private clientRepo: IClientRepository) {}

  async getClientById(id: number): Promise<Client | null> {
    return await this.clientRepo.findOneBy({ id });
  }

  async listClients(page: number, perPage: number): Promise<ClientsList> {
    const [clients, total] = await this.clientRepo.findAndCount({ skip: page, take: perPage });

    return {
      clients,
      page,
      perPage,
      total,
    };
  }

  async createClient(newClient: ClientEntity): Promise<Client> {
    const errors = validateData<ClientEntity>(ClientSchema, newClient);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check Client exists
    const clientExists = await this.clientRepo.findOneBy({ name: newClient.name });

    if (clientExists) throw new HttpError(400, "Client with this number exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save Client
    const client = this.clientRepo.create({ ...newClient });

    await client.save();

    return client;
  }

  async updateClient(id: number, clientData: ClientEntity): Promise<Boolean> {
    const errors = validateData<ClientEntity>(ClientSchema, clientData);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    await this.clientRepo.update({ id }, { ...clientData });

    return true;
  }

  async deleteClient(id: number): Promise<Boolean> {
    await this.clientRepo.update({ id }, { active: false });

    return true;
  }
}
