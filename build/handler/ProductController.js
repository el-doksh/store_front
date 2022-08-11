"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const productModel = new products_1.ProductModel();
class ProductController {
    async index(req, res) {
        const products = await productModel.index();
        res.json(products);
    }
    async mostPopular(req, res) {
        const products = await productModel.mostPopular();
        res.json(products);
    }
    async show(req, res) {
        const product = await productModel.show(parseInt(req.params.id)).catch((err) => {
            res.status(400).json(err);
        });
        if (product) {
            res.json(product);
        }
        else {
            res.status(400).json("Product not found");
        }
    }
    async create(req, res) {
        try {
            const product = {
                name: req.body.name,
                price: parseFloat(req.body.price),
                category: req.body.category
            };
            const newproduct = await productModel.create(product);
            res.json(newproduct);
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
    async productsByCategory(req, res) {
        const products = await productModel.productsByCategory(req.params.name);
        res.json(products);
    }
}
exports.default = ProductController;
