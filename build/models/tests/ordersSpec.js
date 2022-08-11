"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
// status : completed
describe('POST /orders without token return 401', () => {
    it('responds with json', async () => {
        const body = {
            "status": "completed"
        };
        await request.post('/orders')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401);
    });
});
describe('POST /orders without status return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.post('/orders')
            .set('Authorization', `Bearer ${response.body}`)
            .expect(400);
    });
});
describe('POST /orders valid status return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "status": "completed"
        };
        await request.post('/orders')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(200);
    });
});
describe('GET /orders expect 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.get('/orders').set('Authorization', `Bearer ${response.body}`).expect(200);
    });
});
describe('GET /orders without token expect 401', () => {
    it('responds with json', async () => {
        await request.get('/orders').expect(401);
    });
});
describe('GET /orders/1 return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.get('/orders/1').set('Authorization', `Bearer ${response.body}`).expect(200);
    });
});
describe('GET /orders/1 without token expect 401', () => {
    it('responds with json', async () => {
        await request.get('/orders/1').expect(401);
    });
});
describe('GET /orders/100 return 400', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.get('/orders/100').set('Authorization', `Bearer ${response.body}`).expect(400);
    });
});
describe('GET /orders_completed return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.get('/orders_completed').set('Authorization', `Bearer ${response.body}`).expect(200);
    });
});
describe('POST /addProduct valid status return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "quantity": 5,
            "product_id": 1,
            "order_id": 1,
        };
        await request.post('/addProduct')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(200);
    });
});
