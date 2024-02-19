import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IOrderRepository, OrderEntity, OrderRepositoryToken } from "../repos";
import { Client, CreateOrderInput, Order, OrdersList, User } from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { DatabaseProviderToken, ERRORS, IDatabaseProvider } from "~/config";
import { OrderSchema } from "~/types/schemas/";
import { ProductServiceProvider } from ".";

@Injectable()
export class OrderServiceProvider {
  constructor(
    @Inject(forwardRef(() => OrderRepositoryToken)) private orderRepo: IOrderRepository,
    @Inject(forwardRef(() => ProductServiceProvider)) private productService: ProductServiceProvider,
    @Inject(forwardRef(() => DatabaseProviderToken)) private db: IDatabaseProvider
  ) {}

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepo.findOneBy({ id });
  }

  async listOrders(page: number, perPage: number): Promise<OrdersList> {
    const [orders, total] = await this.orderRepo.findAndCount({
      skip: page,
      take: perPage,
      order: {
        updatedAt: "DESC",
      },
    });

    return {
      orders,
      page,
      perPage,
      total,
    };
  }

  async createOrder(newOrder: CreateOrderInput, client: Client, user: User): Promise<Order> {
    const errors = validateData<CreateOrderInput>(OrderSchema, newOrder);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //save order
    const order = this.orderRepo.create({ ...newOrder });

    order.client = client;
    order.user = user;

    const queryRunner = this.db.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      await queryRunner.manager.save(order);

      for (const { productId, quantity } of newOrder.items) {
        await this.productService.decrementAmount(productId, quantity);
      }

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();

      throw new HttpError(500, "Couldn't create order");
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }

    return order;
  }

  async updateOrder(id: number, orderData: OrderEntity): Promise<Boolean> {
    await this.orderRepo.update({ id }, { ...orderData });

    return true;
  }
}
