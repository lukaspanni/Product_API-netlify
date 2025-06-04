import { Product, CreateProductDto, UpdateProductDto } from "../types/product";
import { ProductRepository } from "./product-repository";

export class InMemoryProductRepository implements ProductRepository {
  constructor(private products: Product[] = []) {}

  findAll(): Product[] {
    return this.products;
  }

  findAllFiltered(filters: {
    name?: string;
    price?: number;
    currency?: string;
  }): Product[] {
    let filteredProducts = this.products;

    if (filters.name) {
      const searchName = filters.name.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchName)
      );
    }

    if (filters.price) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price === filters.price
      );
    }

    if (filters.currency) {
      filteredProducts = filteredProducts.filter(
        (product) => product.currency === filters.currency
      );
    }

    return filteredProducts;
  }

  findById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(productDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...productDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateData: UpdateProductDto): Product | undefined {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return undefined;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateData,
    };
    return this.products[productIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length !== initialLength;
  }
}
