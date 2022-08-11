"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginValidator = (req, res, next) => {
    let errors = [];
    const first_name = req.body.first_name;
    if (first_name == undefined) {
        errors.push("first_name field is required");
    }
    const password = req.body.password;
    if (password == undefined) {
        errors.push("password field is required");
    }
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    next();
};
exports.default = LoginValidator;
