import { Injectable, Inject, forwardRef } from "graphql-modules";
import { In, InsertResult } from "typeorm";

import { IProductRepository, ProductEntity, ProductRepositoryToken } from "../repos";
import {
  CreateClientInput,
  CreateOrderInput,
  CreateProductInput,
  OrderItemInput,
  Product,
  ProductsList,
  UpdateProductInput,
} from "~/types/graphql";
import { validateData } from "~/shared/utils/validator";
import { HttpError } from "~/shared/utils/error-handler";
import { ERRORS } from "~/config";
import { ProductSchema } from "~/types/schemas/";

@Injectable()
export class ProductServiceProvider {
  constructor(@Inject(forwardRef(() => ProductRepositoryToken)) private productRepo: IProductRepository) {}

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepo.findOneBy({ id });
  }

  async getMany(ids: number[]): Promise<Product[]> {
    return await this.productRepo.findBy({ id: In(ids) });
  }

  async listProducts(page: number, perPage: number): Promise<ProductsList> {
    const [products, total] = await this.productRepo.findAndCount({
      skip: page,
      take: perPage,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      products,
      page,
      perPage,
      total,
    };
  }

  async createProduct(newProduct: CreateProductInput): Promise<Product> {
    const errors = validateData<CreateProductInput>(ProductSchema, newProduct);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check product exists
    const productExists = await this.productRepo.findOneBy({ label: newProduct.label });

    if (productExists) throw new HttpError(400, "Product with this label exists already.", ERRORS.ENTIY_EXISTS_ERROR);

    //save product
    const product = this.productRepo.create(newProduct);

    await this.productRepo.save(product);

    return product;
  }

  async importProducts(products: CreateProductInput[]): Promise<Product[]> {
    const errors = products.flatMap((product) => validateData<CreateProductInput>(ProductSchema, product));

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //save products
    const importedProducts: InsertResult = await this.productRepo.upsert(products, {
      conflictPaths: ["label"],
    });

    return importedProducts.raw as Product[];
  }

  async updateProduct(id: number, productData: Partial<CreateProductInput>): Promise<Boolean> {
    await this.productRepo.update({ id }, productData);

    return true;
  }

  async decrementAmount(id: number, amount: number): Promise<Boolean> {
    await this.productRepo.decrement({ id }, "available", amount);

    return true;
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.productRepo.softDelete({ id });

    return true;
  }

  async restoreProduct(id: number): Promise<Boolean> {
    await this.productRepo.restore({ id });

    return true;
  }

  async chechAvailability(products: OrderItemInput[]): Promise<string | null> {
    for (const { productId, quantity } of products) {
      const product = await this.getProductById(productId);

      if (!product) return `${productId}`;

      if (product.available < quantity) return product.label;
    }

    return null;
  }

  async calculateTotalPoints(orderItems: OrderItemInput[]): Promise<number> {
    const productIds = orderItems.map(({ productId }) => productId);
    const products = await this.getMany(productIds);

    return products.reduce((total, { id, points }) => {
      const orderItem = orderItems.find(({ productId }) => productId === id);

      if (orderItem) {
        total += orderItem.quantity * points;
      }

      return total;
    }, 0);
  }
}
