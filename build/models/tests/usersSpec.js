"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedPassword = exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const users_1 = require("../users");
const products_1 = require("../products");
const request = (0, supertest_1.default)(server_1.default);
const userModel = new users_1.UserModel();
const productModel = new products_1.ProductModel();
beforeAll(async () => {
    //create a test user and get its token and hashed Password 
    const newUser = {
        "first_name": "Sherif Hesham",
        "last_name": "Hassan Moustafa",
        "password": "12345678"
    };
    const response = await request.post('/users')
        .set('Accept', 'application/json')
        .send(newUser);
    exports.token = response.body;
    const result = await userModel.show('1');
    exports.hashedPassword = result.password;
    productModel.create({
        'name': 'Iphone',
        'price': 5000,
        'category': 'Mobiles'
    });
});
describe("User Model", () => {
    it('should have an index method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(userModel.show).toBeDefined();
    });
    it('should have a find method', () => {
        expect(userModel.find).toBeDefined();
    });
    it('should have a create method', () => {
        expect(userModel.create).toBeDefined();
    });
    it('should have a authenticate method', () => {
        expect(userModel.authenticate).toBeDefined();
    });
    it('index method should return a list of users', async () => {
        const result = await userModel.index();
        expect(result).toEqual([{
                id: 1,
                first_name: 'Sherif Hesham',
                last_name: 'Hassan Moustafa',
                password: exports.hashedPassword
            }]);
    });
    it('show method should return the correct user', async () => {
        const result = await userModel.show("1");
        expect(result).toEqual({
            id: 1,
            first_name: 'Sherif Hesham',
            last_name: 'Hassan Moustafa',
            password: exports.hashedPassword
        });
    });
    it('find method should return the correct user', async () => {
        const result = await userModel.find(exports.hashedPassword);
        expect(result).toEqual({
            id: 1,
            first_name: 'Sherif Hesham',
            last_name: 'Hassan Moustafa',
            password: exports.hashedPassword
        });
    });
    it('authenticate method should return the correct user', async () => {
        const result = await userModel.authenticate("Sherif Hesham", "12345678");
        expect(result?.password).toEqual(exports.hashedPassword);
    });
});
describe('Users APIs ', () => {
    it('POST /users password less than 8 char return 400 ', async () => {
        const body = {
            "first_name": "Sherif Hesham",
            "last_name": "El doksh",
            "password": "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400);
    });
    it('POST /users first name not snet return 400', async () => {
        const body = {
            "last_name": "El doksh",
            "password": "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400);
    });
    it('POST /users last name not snet return 400 ', async () => {
        const body = {
            "first_name": "El doksh",
            "password": "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400);
    });
    it('POST /users/login login with created user return 200', async () => {
        const body = {
            "first_name": "Sherif Hesham",
            "password": "12345678"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(200);
    });
    it('POST /users/login login incoreect credentials return 400', async () => {
        const body = {
            "first_name": "Sherif",
            "password": "12345"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400);
    });
    it('GET /users return 401 without token', async () => {
        await request.get('/users').expect(401);
    });
    it('GET /users return 200 with valid token', async () => {
        const res = await request.get('/users').set('Authorization', `Bearer ${exports.token}`);
        expect(res.status).toEqual(200);
    });
    it('GET /users/1 return 401 without token', async () => {
        await request.get('/users/1').expect(401);
    });
    it('GET /users/1 return 200 with valid token', async () => {
        const res = await request.get('/users/1').set('Authorization', `Bearer ${exports.token}`);
        expect(res.status).toEqual(200);
    });
});
