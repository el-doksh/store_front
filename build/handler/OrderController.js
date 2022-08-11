"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const orderModel = new orders_1.OrderModel();
class OrderController {
    async index(req, res) {
        const orders = await orderModel.index(parseInt(res.locals.user.id));
        res.json(orders);
    }
    async completed(req, res) {
        const orders = await orderModel.completed(parseInt(res.locals.user.id));
        res.json(orders);
    }
    async show(req, res) {
        const order = await orderModel.show(parseInt(req.params.id), parseInt(res.locals.user.id)).catch((err) => {
            res.status(400);
            res.json(err);
        });
        if (order) {
            res.json(order);
        }
        else {
            res.status(400).json("Order not found");
        }
    }
    async create(req, res) {
        try {
            const order = {
                user_id: res.locals.user.id,
                status: req.body.status
            };
            const neworder = await orderModel.create(order).catch((err) => {
                res.status(400);
                res.json("Error while creating order");
                return;
            });
            res.json(neworder);
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
    async addProduct(req, res) {
        try {
            const newOrderProduct = await orderModel.addProduct(parseInt(req.body.quantity), parseInt(req.body.order_id), parseInt(req.body.product_id)).catch((err) => {
                res.status(400);
                res.json("Error while creating order");
                return;
            });
            if (newOrderProduct) {
                res.json(newOrderProduct);
            }
            else {
                res.status(400);
                res.json("Error while creating order");
                return;
            }
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
}
exports.default = OrderController;
