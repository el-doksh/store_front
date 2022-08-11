"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const TokenValidator = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (token == undefined) {
            res.status(401);
            res.json('Token is required');
        }
        const secretToken = process.env.TOKEN_SECRET;
        const payload = jsonwebtoken_1.default.verify(token, secretToken);
        if (payload) {
            const userModel = new users_1.UserModel();
            const user = await userModel.find(payload.user.password).catch((err) => {
                res.status(401);
                res.json('Access denied, invalid token');
            });
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(401);
                res.json('Access denied, invalid token');
            }
        }
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.default = TokenValidator;
