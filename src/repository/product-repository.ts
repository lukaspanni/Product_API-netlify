import { Product, CreateProductDto, UpdateProductDto } from "../types/product";

export interface ProductRepository {
  findAll(): Product[];
  findAllFiltered(filters: {
    name?: string;
    price?: number;
    currency?: string;
  }): Product[];
  findById(id: string): Product | undefined;
  create(product: CreateProductDto): Product;
  update(id: string, product: UpdateProductDto): Product | undefined;
  delete(id: string): boolean;
}
