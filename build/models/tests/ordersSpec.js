"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const orders_1 = require("../orders");
const usersSpec_1 = require("./usersSpec");
const request = (0, supertest_1.default)(server_1.default);
const orderModel = new orders_1.OrderModel();
describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have a completed method', () => {
        expect(orderModel.completed).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderModel.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orderModel.create).toBeDefined();
    });
    it('should have a addProduct method', () => {
        expect(orderModel.addProduct).toBeDefined();
    });
    it('create method should return a list of orders', async () => {
        const result = await orderModel.create({
            user_id: '1',
            status: 'completed'
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'completed',
        });
    });
    it('addProduct method should return a list of orders', async () => {
        const result = await orderModel.addProduct(1, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 1,
            order_id: '1',
            product_id: '1'
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await orderModel.index(1);
        expect(result).toEqual([{
                id: 1,
                user_id: '1',
                status: 'completed',
            }]);
    });
    it('completed method should return a list of orders', async () => {
        const result = await orderModel.completed(1);
        expect(result).toEqual([{
                id: 1,
                user_id: '1',
                status: 'completed',
            }]);
    });
    it('show method should return a list of orders', async () => {
        const result = await orderModel.show(1, 1);
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'completed',
        });
    });
});
describe('Orders API ', () => {
    it('POST /orders without token return 401', async () => {
        const body = {
            "status": "completed"
        };
        await request.post('/orders')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401);
    });
    it('POST /orders without status return 400', async () => {
        await request.post('/orders')
            .set('Authorization', `Bearer ${usersSpec_1.token}`)
            .expect(400);
    });
    it('POST /orders valid status return 200', async () => {
        const body = {
            "status": "completed"
        };
        await request.post('/orders')
            .set('Authorization', `Bearer ${usersSpec_1.token}`)
            .send(body)
            .expect(200);
    });
    it('GET /orders expect 200', async () => {
        await request.get('/orders').set('Authorization', `Bearer ${usersSpec_1.token}`).expect(200);
    });
    it('GET /orders without token expect 401', async () => {
        await request.get('/orders').expect(401);
    });
    it('GET /orders/1 return 200', async () => {
        await request.get('/orders/1').set('Authorization', `Bearer ${usersSpec_1.token}`).expect(200);
    });
    it('GET /orders/1 without token expect 401', async () => {
        await request.get('/orders/1').expect(401);
    });
    it('GET /orders/100 return 400', async () => {
        await request.get('/orders/100').set('Authorization', `Bearer ${usersSpec_1.token}`).expect(400);
    });
    it('GET /orders_completed return 200', async () => {
        await request.get('/orders_completed').set('Authorization', `Bearer ${usersSpec_1.token}`).expect(200);
    });
    it('POST /addProduct return 400', async () => {
        const body = {
            "quantity": 5,
            "order_id": 50,
            "product_id": 12
        };
        await request.post('/addProduct')
            .set('Authorization', `Bearer ${usersSpec_1.token}`)
            .send(body)
            .expect(400);
    });
});
