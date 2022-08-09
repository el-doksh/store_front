"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, DB_HOST = _a.DB_HOST, DB_NAME = _a.DB_NAME, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD;
var database = new pg_1.Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
});
exports.default = database;
