import express from 'express';
import OrderController from '../handler/OrderController';
import ProductController from '../handler/ProductController';
import UserController from '../handler/UserController';
import addProductValidator from '../middlewares/orders/addProductValidator';
import craeteOrderValidator from '../middlewares/orders/craeteOrderValidator';
import createProductValidator from '../middlewares/products/createProductValidator';
import TokenValidator from '../middlewares/TokenValidator';
import createUserValidator from '../middlewares/users/createUserValidator';
import LoginValidator from '../middlewares/users/LoginValidator';

const router = express.Router();

//products routes
const product = new ProductController();
router.get('/products', product.index)
router.get('/products/:id', product.show)
router.get('/products/category/:name', product.productsByCategory)
router.post('/products', TokenValidator, createProductValidator,product.create);
router.get('/most_popular_products', product.mostPopular)

// user routes
const user = new UserController();
router.get('/users', TokenValidator, user.index)
router.get('/users/:id', TokenValidator, user.show)
router.post('/users', createUserValidator ,user.create);
router.post('/users/login', LoginValidator, user.authenticate)

// orders routes
const order = new OrderController();
router.get('/orders', TokenValidator, order.index)
router.get('/orders/:id', TokenValidator, order.show)
router.get('/orders_completed', TokenValidator, order.completed)
router.post('/orders', TokenValidator, craeteOrderValidator, order.create);
router.post('/addProduct', TokenValidator, addProductValidator, order.addProduct);

export default router;

