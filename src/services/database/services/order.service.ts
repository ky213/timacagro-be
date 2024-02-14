import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IOrderRepository, OrderEntity, OrderRepositoryToken } from "../repos";
import { CreateOrderInput, Order, OrdersList } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS } from "~/config";
import { OrderSchema } from "~/types/schemas/";

@Injectable()
export class OrderServiceProvider {
  constructor(@Inject(forwardRef(() => OrderRepositoryToken)) private orderRepo: IOrderRepository) {}

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepo.findOneBy({ id });
  }

  async listOrders(page: number, perPage: number): Promise<OrdersList> {
    const [orders, total] = await this.orderRepo.findAndCount({
      skip: page,
      take: perPage,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      orders,
      page,
      perPage,
      total,
    };
  }

  async createOrder(newOrder: OrderEntity): Promise<Order> {
    const errors = validateData<OrderEntity>(OrderSchema, newOrder);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //save order
    const order = this.orderRepo.create({ ...newOrder });

    await this.orderRepo.save(order);

    return order;
  }

  async updateOrder(id: number, orderData: OrderEntity): Promise<Boolean> {
    await this.orderRepo.update({ id }, { ...orderData });

    return true;
  }
}
