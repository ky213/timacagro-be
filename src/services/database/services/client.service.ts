import { Injectable, Inject, forwardRef } from "graphql-modules";
import fs from "fs";

import { IClientRepository, ClientEntity, ClientRepositoryToken } from "../repos";
import { CreateClientInput, Client, ClientsList } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS, FILES_DIR } from "~/config";
import { ClientSchema } from "~/types/schemas/";
import path from "path";

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

  async createClient(newClient: CreateClientInput): Promise<Pick<Client, "id">> {
    const errors = validateData<CreateClientInput>(ClientSchema, newClient);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check Client exists
    const clientExists = await this.clientRepo.findOneBy({ name: newClient.name });

    if (clientExists) throw new HttpError(400, "Client with this name exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save files
    try {
      Object.values(newClient.files).forEach(async (file) => {
        const fileArrayBuffer = await file.arrayBuffer();
        await fs.promises.writeFile(
          path.join(FILES_DIR, `/${newClient.name}/${file.name}`),
          Buffer.from(fileArrayBuffer)
        );
      });
    } catch {
      throw new HttpError(500, "Coudn't save client's files.");
    }

    //save Client
    const client = this.clientRepo.create({ name: newClient.name });

    await this.clientRepo.save(client);

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
