"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createProductValidator = (req, res, next) => {
    let errors = [];
    const name = req.body.name;
    if (name == undefined) {
        errors.push("name field is required");
    }
    const price = req.body.price;
    if (price == undefined) {
        errors.push("price field is required");
    }
    if (isNaN(price)) {
        errors.push("price should be a number");
    }
    const category = req.body.category;
    if (category == undefined) {
        errors.push("category field is required");
    }
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    next();
};
exports.default = createProductValidator;
