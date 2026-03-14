-- Create the Products table for the clothing store
CREATE TABLE IF NOT EXISTS products (
                                        id TEXT PRIMARY KEY,
                                        name TEXT NOT NULL,
                                        description TEXT,
                                        price REAL NOT NULL, -- REAL is used for decimals in SQLite
                                        category TEXT NOT NULL,
                                        stock INTEGER NOT NULL DEFAULT 0,
                                        imageUrl TEXT,
                                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add some starting data
INSERT INTO products (id, name, description, price, category, stock)
VALUES ('p1', 'Signature Hoodie', 'Cozy oversized fit', 55.00, 'Hoodies', 20);