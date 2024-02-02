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
import { ProductType } from "../global";

export class ProductSchema {
  @IsAlpha()
  @Length(2, 25)
  label!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Quantity should be a number" })
  quantity!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Available Quantity should be a number" })
  available!: number;

  @IsEnum(ProductType)
  type!: ProductType;

  @IsInt({ message: "Points should be integers" })
  points!: number;

  @IsBoolean({ message: "Active should be a boolean" })
  active!: boolean;
}
