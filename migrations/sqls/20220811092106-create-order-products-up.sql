CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity  INTEGER DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE cascade
)