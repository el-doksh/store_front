CREATE TABLE `orders` (
    `id` Serial PRIMARY KEY,
    `product_id` INTEGER(11) NOT NULL,
    `quantity`  INTEGER(11) DEFAULT 1,
    `user_id` INTEGER(11) NOT NULL,
    `status` ENUM('active', 'complete')
);