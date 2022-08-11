import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

// status : completed
describe('POST /orders without token return 401', () => {
    it('responds with json', async () => {
        const body = {
            "status" : "completed"
        };
        await request.post('/orders')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401)
    });
});

describe('POST /orders without status return 400 ', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        await request.post('/orders')
            .set('Authorization', `Bearer ${response.body}`)
            .expect(400)
    });
});

describe('POST /orders valid status return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        
        const body = {   
            "status" : "completed"
        };
        await request.post('/orders')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(200)
    });
});

describe('GET /orders expect 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
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
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
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
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        
        await request.get('/orders/100').set('Authorization', `Bearer ${response.body}`).expect(400);
    });
});


describe('GET /orders_completed return 200', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        
        await request.get('/orders_completed').set('Authorization', `Bearer ${response.body}`).expect(200);
    });
});

describe('POST /addProduct return 400', () => {
    it('responds with json', async () => {
        const login_credentials = {
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        }
        const response = await request.post('/users/login').set('Accept', 'application/json').send(login_credentials);
        
        const body = {
            "quantity" : 5,
            "product_id" : 1,
            "order_id" : 1,
        };
        await request.post('/addProduct')
            .set('Authorization', `Bearer ${response.body}`)
            .send(body)
            .expect(400)
    });
});