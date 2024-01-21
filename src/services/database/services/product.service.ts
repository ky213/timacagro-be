import { Injectable, Inject, forwardRef } from "graphql-modules";

import { IProductRepository, ProductEntity, ProductRepositoryToken } from "../repos";
import { CreateProductInput, Product, ProductsList, UpdateProductInput } from "~/types/graphql";
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

  async listProducts(page: number, perPage: number): Promise<ProductsList> {
    const [products, total] = await this.productRepo.findAndCount({ skip: page, take: perPage });

    return {
      products,
      page,
      perPage,
      total,
    };
  }

  async createProduct(newProduct: ProductEntity): Promise<Product> {
    const errors = validateData<ProductEntity>(ProductSchema, newProduct);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check product exists
    const productExists = await this.productRepo.findOneBy({ type: newProduct.type });

    if (productExists) throw new HttpError(400, "User with this email exists.", ERRORS.ENTIY_EXISTS_ERROR);

    //save product
    const product = this.productRepo.create({ ...newProduct });

    await product.save();

    return product;
  }

  async updateProduct(id: number, productData: ProductEntity): Promise<Boolean> {
    await this.productRepo.update({ id }, { ...productData });

    return true;
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.productRepo.update({ id }, { active: false });

    return true;
  }
}
