import { Injectable, Inject, forwardRef } from "graphql-modules";
import path from "path";
import fs from "fs";

import { IClientRepository, ClientRepositoryToken } from "../repos";
import { CreateClientInput, Client, ClientsList, UpdateClientInput } from "~/types/graphql";
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
    if (newClient.files?.length < 10) throw new HttpError(400, "10 files required", ERRORS.INVALID_INPUT_ERROR);

    const errors = validateData<CreateClientInput>(ClientSchema, newClient);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check Client exists
    const clientExists = await this.clientRepo.findOneBy({ name: newClient.name });

    if (clientExists) throw new HttpError(400, "Client with this name exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save files
    try {
      const clientFolder = `${FILES_DIR}/${newClient.name.replaceAll(" ", "-")}`;

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
    const client = this.clientRepo.create({ name: newClient.name });

    await this.clientRepo.save(client);

    return client;
  }

  async updateClient(client: Client, newClientData: UpdateClientInput): Promise<Boolean> {
    const errors = validateData<UpdateClientInput>(ClientSchema, newClientData, { isUpdate: true });

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    if (newClientData.files?.length) {
      try {
        const clientFolder = `${FILES_DIR}/${client.name.replaceAll(" ", "-")}`;

        newClientData.files.forEach(async (file) => {
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
    }

    if (newClientData.name) await this.clientRepo.update({ id: client.id }, { name: newClientData.name });

    return true;
  }

  async deleteClient(id: number): Promise<Boolean> {
    await this.clientRepo.softDelete({ id });

    return true;
  }

  async restoreClient(id: number): Promise<Boolean> {
    await this.clientRepo.restore({ id });

    return true;
  }
}
