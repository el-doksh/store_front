"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.BCRYPT_PASSWORD;
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
    async find(password) {
        try {
            const sql = 'SELECT * FROM users WHERE password=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [password]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find User Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const saltRounds = process.env.SALT_ROUNDS;
            const password = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.first_name, u.last_name, password]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`);
        }
    }
    async authenticate(first_name, password) {
        const sql = 'select password from users where first_name = $1';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [first_name]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserModel = UserModel;
