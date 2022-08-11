"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../handler/OrderController"));
const ProductController_1 = __importDefault(require("../handler/ProductController"));
const UserController_1 = __importDefault(require("../handler/UserController"));
const addProductValidator_1 = __importDefault(require("../middlewares/orders/addProductValidator"));
const craeteOrderValidator_1 = __importDefault(require("../middlewares/orders/craeteOrderValidator"));
const createProductValidator_1 = __importDefault(require("../middlewares/products/createProductValidator"));
const TokenValidator_1 = __importDefault(require("../middlewares/TokenValidator"));
const createUserValidator_1 = __importDefault(require("../middlewares/users/createUserValidator"));
const LoginValidator_1 = __importDefault(require("../middlewares/users/LoginValidator"));
const router = express_1.default.Router();
//products routes
const product = new ProductController_1.default();
router.get('/products', product.index);
router.get('/products/:id', product.show);
router.get('/products/category/:name', product.productsByCategory);
router.post('/products', TokenValidator_1.default, createProductValidator_1.default, product.create);
router.get('/most_popular_products', product.mostPopular);
// user routes
const user = new UserController_1.default();
router.get('/users', TokenValidator_1.default, user.index);
router.get('/users/:id', TokenValidator_1.default, user.show);
router.post('/users', createUserValidator_1.default, user.create);
router.post('/users/login', LoginValidator_1.default, user.authenticate);
// orders routes
const order = new OrderController_1.default();
router.get('/orders', TokenValidator_1.default, order.index);
router.get('/orders/:id', TokenValidator_1.default, order.show);
router.get('/orders_completed', TokenValidator_1.default, order.completed);
router.post('/orders', TokenValidator_1.default, craeteOrderValidator_1.default, order.create);
router.post('/addProduct', TokenValidator_1.default, addProductValidator_1.default, order.addProduct);
exports.default = router;
