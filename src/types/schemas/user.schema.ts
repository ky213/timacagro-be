import { Length, IsEmail, IsBoolean, IsStrongPassword, MaxLength, IsEnum, IsAlpha, IsNumber } from "class-validator";

import { Region, Role } from "~/types/global";
import { CreateUserInput } from "../graphql";

export class PasswordSchema {
  @MaxLength(50)
  @IsStrongPassword({ minNumbers: 1, minLength: 6, minSymbols: 0, minUppercase: 0, minLowercase: 0 })
  password!: string;
}

export class LoginSchema extends PasswordSchema {
  @IsEmail()
  email!: string;
}

export class CreateUserSchema implements CreateUserInput {
  @IsAlpha()
  @Length(2, 25)
  firstName!: string;

  @IsAlpha()
  @Length(2, 25)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsEnum(Role)
  role!: Role;

  @IsEnum(Region)
  region!: Region;

  @IsNumber()
  targetPoints?: number;
}
