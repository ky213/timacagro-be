import { InjectionToken, Provider } from "graphql-modules";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
  DeleteDateColumn,
} from "typeorm";

import { database } from "~/config";
import { Invoice } from "~/types/graphql";

@Entity()
export class InvoiceEntity implements Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  number!: string;

  @Column({ type: "numeric", nullable: false })
  client!: number;

  @Column({ type: "numeric", nullable: false })
  total!: number;

  @Column({ type: "boolean", default: true })
  payed!: boolean;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt?: Date;
}

export type IInvoiceRepository = Repository<InvoiceEntity>;

export const InvoiceRepositoryToken = new InjectionToken<IInvoiceRepository>("InvoiceRepository");

export const InvoiceRepositoryProvider: Provider<IInvoiceRepository> = {
  provide: InvoiceRepositoryToken,
  useFactory: () => database.getRepository(InvoiceEntity),
};
