"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const orderModel = new orders_1.OrderModel();
const productModel = new products_1.ProductModel();
const addProductValidator = async (req, res, next) => {
    let errors = Array();
    const quantity = req.body.quantity;
    if (quantity == undefined) {
        errors.push("quantity field is required");
    }
    if (quantity <= 0) {
        errors.push("quantity should be greater than 0");
    }
    const order_id = req.body.order_id;
    if (order_id == undefined) {
        errors.push("order_id field is required");
    }
    const findOrder = await orderModel.show(order_id, parseInt(res.locals.user.id)).catch((err) => {
        errors.push("Order not found");
    });
    if (!findOrder) {
        errors.push("Order not found");
    }
    const product_id = req.body.product_id;
    if (product_id == undefined) {
        errors.push("product_id field is required");
    }
    const findProduct = await productModel.show(product_id).catch((err) => {
        errors.push("product not found");
    });
    if (!findProduct) {
        errors.push("product not found");
    }
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    next();
};
exports.default = addProductValidator;
