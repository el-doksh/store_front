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
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`);
        }
    }
    async create(product) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3, $4) RETURNING *';
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
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const Product = result.rows[0];
            conn.release();
            return Product;
        }
        catch (err) {
            throw new Error(`Could not delete Product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
