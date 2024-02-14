import { IsArray, ArrayMaxSize, ValidateNested, IsNumber } from "class-validator";
import { Client, CreateOrderInput, Order, OrderItem, Product, User } from "../graphql";
import { Type } from "class-transformer";
import { ClientSchema, ProductSchema, UserSchema } from ".";

export class OrderSchema implements CreateOrderInput {
  @Type(() => ClientSchema)
  client!: Client;

  @Type(() => UserSchema)
  user!: User;

  @IsArray()
  @ArrayMaxSize(20)
  @Type(() => OrderItemSchema)
  @ValidateNested({ each: true })
  items!: OrderItem[];
}

export class OrderItemSchema implements OrderItem {
  @Type(() => ProductSchema)
  product!: Product;

  @IsNumber({ maxDecimalPlaces: 1 })
  quantity!: number;
}
