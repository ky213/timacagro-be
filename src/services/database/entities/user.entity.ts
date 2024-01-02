import { InjectionToken, Provider } from "graphql-modules";
import { ROLE } from "modules/user/model";
import { database } from "config/database";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Repository,
} from "typeorm";

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

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: "enum", enum: ROLE, nullable: false })
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}

export type IUserService = Repository<UserEntity>;

export const UserService = new InjectionToken<IUserService>("UserService");

export const UserServiceProvider: Provider<IUserService> = {
  provide: UserService,
  useFactory: () => database.getRepository(UserEntity),
};
