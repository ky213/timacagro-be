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
import { Region, Role } from "~/types/graphql";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  firstName!: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  lastName!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false, select: false })
  password!: string;

  @Column({ type: "enum", enum: Role, nullable: false })
  role!: Role;

  @Column({ type: "enum", enum: Region, nullable: true })
  region: Nil<Region>;

  @Column({ type: "numeric", nullable: true })
  currentPoints: Nil<number>;

  @Column({ type: "numeric", nullable: true })
  targetPoints: Nil<number>;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Column({ type: "boolean", default: false })
  emailConfirmed!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;
}

export type IUserRepository = Repository<UserEntity>;

export const UserRepositoryToken = new InjectionToken<IUserRepository>("UserRepository");

export const UserRepositoryProvider: Provider<IUserRepository> = {
  provide: UserRepositoryToken,
  useFactory: () => database.getRepository(UserEntity),
};
