"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async index(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders where user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot connect ${err}`);
        }
    }
    async completed(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders where user_id=($1) and status='completed'";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot connect ${err}`);
        }
    }
    async show(id, userId) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1) and user_id=($2)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id, userId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`);
        }
    }
    async create(ord) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [ord.user_id, ord.status]);
            const Order = result.rows[0];
            conn.release();
            return Order;
        }
        catch (err) {
            throw new Error(`Could not add new Order Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const insertProductSql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(insertProductSql, [quantity, orderId, productId]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
