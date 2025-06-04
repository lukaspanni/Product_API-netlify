export type Currency = "EUR" | "USD" | "GBP"; // Unterstützte Währungen als Union Type

export type Product = {
  id: string; // Eindeutige ID des Produkts
  name: string; // Name des Produkts
  description: string; // Beschreibung des Produkts
  price: number; // Preis des Produkts
  currency: Currency; // Währung des Preises
};

// Produkt-Typ ohne ID (wird bei Erstellung vergeben)
export type CreateProductDto = Omit<Product, "id">;
// Produkt-Typ für Aktualisierungen (alle Felder bis auf id optional)
export type UpdateProductDto = Partial<CreateProductDto> & { id: string };
