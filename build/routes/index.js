"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import students from './api/students';
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Hello dokshoty');
});
// routes.get('/students', students);
exports.default = routes;
