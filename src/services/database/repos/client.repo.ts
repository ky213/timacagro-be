import { InjectionToken, Provider } from "graphql-modules";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";

import { database } from "~/config";
import { Client, Order } from "~/types/graphql";
import { OrderEntity } from "./order.repo";

@Entity()
export class ClientEntity implements Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  name!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt?: Date;

  @ManyToOne(() => OrderEntity, (order) => order.client)
  orders?: Order[];
}

export type IClientRepository = Repository<ClientEntity>;

export const ClientRepositoryToken = new InjectionToken<IClientRepository>("ClientRepository");

export const ClientRepositoryProvider: Provider<IClientRepository> = {
  provide: ClientRepositoryToken,
  useFactory: () => database.getRepository(ClientEntity),
};
