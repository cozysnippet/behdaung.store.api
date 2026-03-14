import {Product} from "../types";

export class ProductService {
    constructor(private db: D1Database) {}

    async getAll(): Promise<Product[]> {
        // We cast the results to Product[] to satisfy TypeScript's safety checks
        const { results } = await this.db.prepare("SELECT * FROM products").all<Product>();
        return results || [];
    }

    async create(data: Omit<Product, 'id'>): Promise<Product> {
        const id = crypto.randomUUID();
        await this.db.prepare(
            "INSERT INTO products (id, name, description, price, category, stock, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
            .bind(id, data.name, data.description, data.price, data.category, data.stock, data.imageUrl)
            .run();

        return { id, ...data } as Product;
    }

    async delete(id: string) {
        const { meta } = await this.db.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
        return meta.changes > 0;
    }
}