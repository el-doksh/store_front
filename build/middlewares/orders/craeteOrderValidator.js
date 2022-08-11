"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const craeteOrderValidator = (req, res, next) => {
    let errors = [];
    const status = req.body.status;
    if (status == undefined) {
        errors.push("status field is required and its value are active/completed");
    }
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    next();
};
exports.default = craeteOrderValidator;
