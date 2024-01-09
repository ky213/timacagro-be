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

import { database } from "config/database";
import { ROLE_ENUM } from "types/global";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  lastName: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false, select: false })
  password: string;

  @Column({ type: "enum", enum: ROLE_ENUM, nullable: false })
  role: ROLE_ENUM;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  emailConfirmed: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: string;
}

export type IUserRepository = Repository<UserEntity>;

export const UserRepositoryToken = new InjectionToken<IUserRepository>("UserRepository");

export const UserRepositoryProvider: Provider<IUserRepository> = {
  provide: UserRepositoryToken,
  useFactory: () => database.getRepository(UserEntity),
};
