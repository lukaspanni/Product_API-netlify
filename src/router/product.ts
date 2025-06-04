import express, { Request, Response } from "express";
import { CreateProductDto, UpdateProductDto } from "../types/product";
import { ProductRepository } from "../repository/product-repository";

const buildProductRouter = (productRepository: ProductRepository) => {
  const router = express.Router();

  /**
   * GET /
   * Gibt eine Liste aller Produkte zurück.
   * Optional können Filter nach Name, Preis und Währung angewendet werden.
   */
  router.get("/", (req: Request, res: Response) => {
    const { name, price, currency } = req.query;

    const parsedPrice =
      typeof price === "string" ? parseFloat(price) : undefined;
    const filters = {
      name: typeof name === "string" ? name : undefined,
      price:
        parsedPrice !== undefined && !isNaN(parsedPrice)
          ? parsedPrice
          : undefined,
      currency: typeof currency === "string" ? currency : undefined,
    };

    const products = productRepository.findAllFiltered(filters);
    res.status(200).json(products);
  });

  /**
   * GET /:id
   * Gibt ein bestimmtes Produkt anhand seiner ID zurück.
   */
  router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const product = productRepository.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  });

  /**
   * POST /
   * Erstellt ein neues Produkt.
   * Erfordert name, description, price und currency im Request Body.
   */
  router.post("/", (req: Request, res: Response) => {
    const productDto = req.body as CreateProductDto;

    if (
      !productDto.name ||
      !productDto.description ||
      !productDto.price ||
      !productDto.currency
    ) {
      res.status(400).json({
        message: "Missing required fields: name, description, price, currency",
      });
      return;
    }

    if (typeof productDto.price !== "number" || productDto.price <= 0) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    const newProduct = productRepository.create(productDto);
    res.status(201).json(newProduct);
  });

  /**
   * PUT /:id
   * Aktualisiert ein bestehendes Produkt anhand seiner ID.
   * Erlaubt die Aktualisierung von name, description, price, currency.
   */
  router.put("/:id", ({ params: { id }, body }: Request, res: Response) => {
    const updateData = body as UpdateProductDto;

    if (
      updateData.price !== undefined &&
      (typeof updateData.price !== "number" || updateData.price <= 0)
    ) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    const updatedProduct = productRepository.update(id, updateData);
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  });

  /**
   * DELETE /:id
   * Löscht ein Produkt anhand seiner ID.
   */
  router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = productRepository.delete(id);

    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(204).send(); // 204 No Content für erfolgreiches Löschen
    }
  });

  return router;
};

export default buildProductRouter;
