import { Length, IsBoolean, IsEnum, IsNumber, IsInt } from "class-validator";
import { ProductType } from "../global";

export class ProductSchema {
  @Length(2, 25)
  label!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Quantity should be a number" })
  quantity!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: "Available Quantity should be a number" })
  available: number | undefined;

  @IsEnum(ProductType)
  type!: ProductType;

  @IsInt({ message: "Points should be integers" })
  points!: number;
}
