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

import { database } from "config";

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  type: string;

  @Column({ type: "numeric", nullable: false })
  quantity: number;

  @Column({ type: "numeric", nullable: false })
  points: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;
}

export type IProductRepository = Repository<ProductEntity>;

export const ProductRepositoryToken = new InjectionToken<IProductRepository>("ProductRepository");

export const ProductRepositoryProvider: Provider<IProductRepository> = {
  provide: ProductRepositoryToken,
  useFactory: () => database.getRepository(ProductEntity),
};
