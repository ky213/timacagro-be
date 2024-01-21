import { InjectionToken, Provider } from "graphql-modules";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Repository,
} from "typeorm";

import { database } from "~/config";

@Entity()
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  name!: string;

  @Column({ type: "varchar", array: true, nullable: false })
  files!: string[];

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;
}

export type IClientRepository = Repository<ClientEntity>;

export const ClientRepositoryToken = new InjectionToken<IClientRepository>("ClientRepository");

export const ClientRepositoryProvider: Provider<IClientRepository> = {
  provide: ClientRepositoryToken,
  useFactory: () => database.getRepository(ClientEntity),
};
