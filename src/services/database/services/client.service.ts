import { Injectable, Inject, forwardRef } from "graphql-modules";
import path from "path";
import fs from "fs";

import { IClientRepository, ClientEntity, ClientRepositoryToken } from "../repos";
import { CreateClientInput, Client, ClientsList } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS, FILES_DIR } from "~/config";
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

  async createClient(newClient: CreateClientInput): Promise<Client> {
    // const errors = validateData<CreateClientInput>(ClientSchema, newClient);

    // if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check Client exists
    const clientExists = await this.clientRepo.findOneBy({ name: newClient.clientName });

    if (clientExists) throw new HttpError(400, "Client with this name exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save files
    try {
      const clientFolder = `${FILES_DIR}/${newClient.clientName.replaceAll(" ", "-")}`;

      newClient.files.forEach(async (file) => {
        const fileArrayBuffer = await file.arrayBuffer();

        if (!fs.existsSync(clientFolder))
          fs.mkdir(clientFolder, (error) => {
            if (error) throw new Error("coudn't open client folder.");
          });

        await fs.promises.writeFile(`${clientFolder}/${file.name.toLocaleLowerCase()}`, Buffer.from(fileArrayBuffer));
      });
    } catch {
      throw new HttpError(500, "Coudn't save client's files.");
    }

    //save Client
    const client = this.clientRepo.create({ name: newClient.clientName });

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
