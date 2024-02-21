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
import { ProductType } from "~/types/global";
import { Product } from "~/types/graphql";

@Entity()
export class ProductEntity implements Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  label!: string;

  @Column({ type: "enum", enum: ProductType, nullable: false })
  type!: ProductType;

  @Column({ type: "numeric", nullable: false })
  quantity!: number;

  @Column({ type: "numeric", nullable: false })
  available!: number;

  @Column({ type: "numeric", nullable: false })
  points!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt?: Date;
}

export type IProductRepository = Repository<ProductEntity>;

export const ProductRepositoryToken = new InjectionToken<IProductRepository>("ProductRepository");

export const ProductRepositoryProvider: Provider<IProductRepository> = {
  provide: ProductRepositoryToken,
  useFactory: () => database.getRepository(ProductEntity),
};
