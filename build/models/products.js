"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot connect ${err}`);
        }
    }
    async mostPopular() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT products.*, sum(order_products.quantity) as quantity
                            FROM products 
                            left outer join order_products on order_products.product_id = products.id
                            group by products.id
                            order by quantity desc
                            LIMIT 5
                            `;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot connect ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`);
        }
    }
    async create(product) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            const Product = result.rows[0];
            conn.release();
            return Product;
        }
        catch (err) {
            throw new Error(`Could not add new Product ${product.name}. Error: ${err}`);
        }
    }
    async productsByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products where category = ($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot connect ${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
