import { IsArray, ArrayMaxSize, ValidateNested, IsNumber } from "class-validator";
import { Client, Order, OrderItem, Product, User } from "../graphql";
import { Type } from "class-transformer";
import { ProductSchema } from ".";

export class OrderSchema implements Omit<Order, "id" | "createdAt" | "updatedAt"> {
  client!: Client;
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
