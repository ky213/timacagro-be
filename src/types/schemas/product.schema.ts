import {
  Length,
  IsEmail,
  IsBoolean,
  IsStrongPassword,
  MaxLength,
  IsEnum,
  IsAlpha,
  IsNumber,
  IsInt,
} from "class-validator";

export class ProductSchema {
  @IsAlpha()
  @Length(2, 25)
  type: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Quantity should be a number" })
  quantity: number;

  @IsInt({ message: "Points should be integers" })
  points: number;

  @IsBoolean({ message: "Active should be a boolean" })
  active: boolean;
}
