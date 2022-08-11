"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const userModel = new users_1.UserModel();
const index = async (req, res) => {
    res.send('hello');
    return;
    const users = await userModel.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await userModel.show(req.body.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const newuser = await userModel.create(user);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await userModel.delete(req.body.id);
    res.json(deleted);
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    //   app.post('/users', create)
    //   app.delete('/users', destroy)
};
exports.default = userRoutes;
