"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('POST /products without token return 401', () => {
    it('responds with json', async () => {
        const body = {
            "name": "product 1",
            "price": 50,
            "category": "category"
        };
        await request.post('/products')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401);
    });
});
describe('POST /products wrong price return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "name": "product 1",
            "price": "string price",
            "category": "category"
        };
        await request.post('/products')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(400);
    });
});
describe('POST /products no name return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "price": "string price",
            "category": "category"
        };
        await request.post('/products')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(400);
    });
});
describe('POST /products no price return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "name": "prodct",
            "category": "category"
        };
        await request.post('/products')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(400);
    });
});
describe('POST /products no category return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "name": "name",
            "price": 40
        };
        await request.post('/products').set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(400);
    });
});
describe('POST /products valid request return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        const body = {
            "name": "Iphone",
            "price": 40,
            "category": "Mobile"
        };
        await request.post('/products')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(200);
    });
});
describe('GET /products expect 200', () => {
    it('responds with json', async () => {
        await request.get('/products').expect(200);
    });
});
describe('GET /products/1 return 200', () => {
    it('responds with json', async () => {
        await request.get('/products/1').expect(200);
    });
});
describe('GET /products/100 return 400', () => {
    it('responds with json', async () => {
        await request.get('/products/100').expect(400);
    });
});
describe('GET /most_popular_products return 200', () => {
    it('responds with json', async () => {
        await request.get('/most_popular_products').expect(200);
    });
});
describe('GET /products/category/Mobile return 200', () => {
    it('responds with json', async () => {
        await request.get('/products/category/Mobile').expect(200);
    });
});
