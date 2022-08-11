"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new users_1.UserModel();
class UserController {
    async index(req, res) {
        const users = await userModel.index();
        res.json(users);
    }
    async show(req, res) {
        const user = await userModel.show(req.params.id).catch((err) => {
            res.status(400);
            res.json(err);
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(400);
            res.json("User not found");
        }
    }
    async create(req, res) {
        try {
            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            };
            var tokenSecret = process.env.TOKEN_SECRET;
            const newuser = await userModel.create(user);
            const token = jsonwebtoken_1.default.sign({ user: newuser }, tokenSecret);
            res.json(token);
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
    async authenticate(req, res) {
        const user = await userModel.authenticate(req.body.first_name, req.body.password);
        if (user) {
            var tokenSecret = process.env.TOKEN_SECRET;
            const token = jsonwebtoken_1.default.sign({ user: user }, tokenSecret);
            res.json(token);
        }
        else {
            res.status(400).json("first_name or password is wrong");
        }
    }
}
exports.default = UserController;
