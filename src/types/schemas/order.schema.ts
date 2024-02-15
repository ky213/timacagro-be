import { IsArray, ArrayMaxSize, ValidateNested, IsNumber, IsInt } from "class-validator";
import { CreateOrderInput, OrderItemInput } from "../graphql";
import { Type } from "class-transformer";

export class OrderSchema implements CreateOrderInput {
  @IsInt()
  clientId!: number;

  @IsInt()
  userId!: number;

  @IsArray()
  @ArrayMaxSize(20)
  @Type(() => OrderItemSchema)
  @ValidateNested({ each: true })
  items!: OrderItemInput[];
}

export class OrderItemSchema implements OrderItemInput {
  @IsInt()
  productId!: number;

  @IsNumber({ maxDecimalPlaces: 1 })
  quantity!: number;
}
