import { ROLE } from "modules/user/model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  lastName: string;

  @Column({ type: "varchar", nullable: false })
  fullName: string;

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
