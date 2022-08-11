CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity  INTEGER DEFAULT 1,
    user_id INTEGER NOT NULL,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE cascade
);