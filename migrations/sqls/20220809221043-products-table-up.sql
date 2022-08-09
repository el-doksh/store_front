CREATE TABLE `products` (
    `id` Serial PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` FLOAT DEFAULT 0,
    `category` VARCHAR(255)
);