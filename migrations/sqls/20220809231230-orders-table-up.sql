CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(45) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE cascade
);