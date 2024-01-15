import { Injectable, Inject, forwardRef } from "graphql-modules";

import { UserRepositoryToken, IUserRepository, IProductRepository, ProductRepositoryToken } from "../repos";
import { CreateProductInput, Product, ProductsList, UpdateProductInput } from "types/graphql";
import { validateData } from "shared/utils/validator";
import { HttpError } from "shared/utils/error-handler";
import { ERRORS } from "config";
import { ProductSchema, UserSchema } from "types/schemas/";
import { generateHash } from "shared/utils/cyphers";

@Injectable()
export class ProductServiceProvider {
  constructor(
    @Inject(forwardRef(() => ProductRepositoryToken)) private productRepo: IProductRepository,
    @Inject(forwardRef(() => UserRepositoryToken)) private userRepo: IUserRepository
  ) {}

  async getProductById(id: number): Promise<Product> {
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

  async createProduct(newProduct: CreateProductInput): Promise<Product> {
    const errors = validateData<CreateProductInput>(ProductSchema, newProduct);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check product exists
    const productExists = await this.productRepo.findOneBy({ type: newProduct.type });

    if (productExists) throw new HttpError(400, "User with this email exists.", ERRORS.PRODUCT_EXISTS_ERROR);

    //save product
    const product = this.productRepo.create({ ...newProduct });

    await product.save();

    return product;
  }

  async updateProduct(id: number, productData: UpdateProductInput): Promise<Boolean> {
    await this.userRepo.update({ id }, { ...productData });

    return true;
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.productRepo.update({ id }, { active: false });

    return true;
  }
}
