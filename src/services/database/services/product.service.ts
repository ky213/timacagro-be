import { Injectable, Inject, forwardRef } from "graphql-modules";
import { In } from "typeorm";

import { IProductRepository, ProductEntity, ProductRepositoryToken } from "../repos";
import { CreateProductInput, ImportProductsInput, Product, ProductsList, UpdateProductInput } from "~/types/graphql";
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

  async createProduct(newProduct: ProductEntity): Promise<Product> {
    const errors = validateData<ProductEntity>(ProductSchema, newProduct);

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //check product exists
    const productExists = await this.productRepo.findOneBy({ label: newProduct.label });

    if (productExists) throw new HttpError(400, "Product with this label exists already.", ERRORS.ENTIY_EXISTS_ERROR);

    //save product
    const product = this.productRepo.create({ ...newProduct });

    await this.productRepo.save(product);

    return product;
  }

  async importProducts({ products }: ImportProductsInput): Promise<boolean> {
    const errors = products.flatMap((product) => validateData<CreateProductInput>(ProductSchema, product));

    if (errors.length) throw new HttpError(400, "Data not valid", ERRORS.INVALID_INPUT_ERROR);

    //save product
    await this.productRepo.upsert(products, {
      conflictPaths: ["label"],
    });

    return true;
  }

  async updateProduct(id: number, productData: ProductEntity): Promise<Boolean> {
    await this.productRepo.update({ id }, { ...productData });

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

  async chechAvailability(productId: number, requestedQuantity: number): Promise<boolean> {
    const product = await this.getProductById(productId);

    if (!product) throw new HttpError(404, "Product not found.", ERRORS.RESOURCE_NOT_FOUND);

    if (product.available < requestedQuantity) return false;

    return true;
  }
}
