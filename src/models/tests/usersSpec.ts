import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('POST /users password less than 8 char return 400 ', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif Hesham",
            "last_name" : "El doksh",
            "password" : "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)        
    });
});

describe('POST /users first name not snet return 400 ', () => {
    it('responds with json', async () => {
        const body = {   
            "last_name" : "El doksh",
            "password" : "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });
});

describe('POST /users last name not snet return 400 ', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "El doksh",
            "password" : "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });
});

describe('POST /users all inputs valid return 200', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif Hesham",
            "last_name" : "El doksh",
            "password" : "12345678"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(200)
    });
});

describe('POST /users/login login with created user return 200', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(200)
    });
});

describe('POST /users/login login incoreect credentials return 400', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif",
            "password" : "12345"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });
});

describe('GET /users return 401 without token', () => {
    it('responds with json', async () => {
        await request.get('/users').expect(401);
    });
});

describe('GET /users return 200 with valid token', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(body);
        const res = await request.get('/users').set('Authorization', `Bearer ${response.body}`) 
        expect(res.status).toEqual(200)
    });
});

describe('GET /users/1 return 401 without token', () => {
    it('responds with json', async () => {
        await request.get('/users/1').expect(401);
    });
});

describe('GET /users/1 return 200 with valid token', () => {
    it('responds with json', async () => {
        const body = {   
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        };
        const response = await request.post('/users/login').set('Accept', 'application/json').send(body);
        const res = await request.get('/users/1').set('Authorization', `Bearer ${response.body}`) 
        expect(res.status).toEqual(200)
    });
});
