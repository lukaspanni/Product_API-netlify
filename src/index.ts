import express from "express";
import buildProductRouter from "./router/product";
import { InMemoryProductRepository } from "./repository/in-memory-product-repository";
import type { Product } from "./types/product";

const sampleData = [
  {
    id: crypto.randomUUID(),
    name: "Laptop Pro X",
    description: "Leistungsstarker Laptop für professionelle Anwendungen.",
    price: 1200.0,
    currency: "EUR",
  },
  {
    id: crypto.randomUUID(),
    name: "Gaming Maus XYZ",
    description: "Ergonomische Maus für Gamer mit anpassbaren Tasten.",
    price: 65.99,
    currency: "EUR",
  },
  {
    id: crypto.randomUUID(),
    name: "UHD Monitor 27 Zoll",
    description: "4K-Monitor mit hoher Farbtreue.",
    price: 350.0,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    name: "Smartphone Z10",
    description: "Neuestes Smartphone mit fortschrittlicher Kamera.",
    price: 899.99,
    currency: "GBP",
  },
] satisfies Product[];

const app = express();

app.use(express.json()); // Middleware zum Parsen von JSON-Daten

const productRepository = new InMemoryProductRepository(sampleData);
const productRouter = buildProductRouter(productRepository);
app.use("/products", productRouter);

app.get("/", (_, res) => {
  res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");
