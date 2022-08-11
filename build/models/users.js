"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
class UserModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
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
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`);
        }
    }
    async create(user) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.first_name, user.last_name, user.password]);
            const User = result.rows[0];
            conn.release();
            return User;
        }
        catch (err) {
            throw new Error(`Could not add new User ${user.first_name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const User = result.rows[0];
            conn.release();
            return User;
        }
        catch (err) {
            throw new Error(`Could not delete User ${id}. Error: ${err}`);
        }
    }
}
exports.UserModel = UserModel;
