import { Length, IsEmail, IsBoolean, IsStrongPassword, MaxLength, IsEnum, IsAlpha } from "class-validator";

import { Role } from "types/global";

export class PasswordSchema {
  @MaxLength(50)
  @IsStrongPassword({ minNumbers: 1, minLength: 6, minSymbols: 0, minUppercase: 0, minLowercase: 0 })
  password!: string;
}

export class LoginSchema extends PasswordSchema {
  @IsEmail()
  email!: string;
}

export class UserSchema extends LoginSchema {
  @IsAlpha()
  @Length(2, 25)
  firstName!: string;

  @IsAlpha()
  @Length(2, 25)
  lastName!: string;

  @IsEnum(Role)
  role!: Role;

  @IsBoolean()
  active!: boolean;
}
