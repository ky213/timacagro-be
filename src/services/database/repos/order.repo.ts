import { InjectionToken, Provider } from "graphql-modules";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
  ManyToOne,
} from "typeorm";

import { database } from "~/config";
import { Client, Order, OrderItem, User } from "~/types/graphql";
import { ClientEntity, UserEntity } from ".";

@Entity()
export class OrderEntity implements Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client!: Client;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: User;

  @Column({ type: "simple-json" })
  items!: OrderItem[];

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;
}

export type IOrderRepository = Repository<OrderEntity>;

export const OrderRepositoryToken = new InjectionToken<IOrderRepository>("OrderRepository");

export const OrderRepositoryProvider: Provider<IOrderRepository> = {
  provide: OrderRepositoryToken,
  useFactory: () => database.getRepository(OrderEntity),
};
