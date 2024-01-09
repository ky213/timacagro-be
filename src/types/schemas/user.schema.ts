import { Length, IsEmail, IsBoolean, IsStrongPassword, MaxLength, IsEnum, IsAlpha } from "class-validator";

import { ROLE_ENUM } from "types/global";

export default class UserSchema {
  @IsAlpha()
  @Length(2, 25)
  firstName: string;

  @IsAlpha()
  @Length(2, 25)
  lastName: string;

  @IsEmail()
  email: string;

  @MaxLength(50)
  @IsStrongPassword({ minNumbers: 1, minLength: 6, minSymbols: 0, minUppercase: 0, minLowercase: 0 })
  password: string;

  @IsEnum(ROLE_ENUM)
  role: string;

  @IsBoolean()
  active: boolean;
}
