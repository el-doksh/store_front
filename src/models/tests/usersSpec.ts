import supertest from 'supertest';
import app from '../../server';
import { User, UserModel } from '../users';
import { ProductModel } from '../products';

const request = supertest(app);

const userModel = new UserModel()
const productModel = new ProductModel()

export var token : string, hashedPassword : string;

beforeAll(async () : Promise<void> => {
    //create a test user and get its token and hashed Password 
    const newUser = {
        "first_name" : "Sherif Hesham",
        "last_name" : "Hassan Moustafa",
        "password" : "12345678"
    };
    const response = await request.post('/users')
                                .set('Accept', 'application/json')
                                .send(newUser)
    token = response.body as string;
    const result = await userModel.show('1');
    hashedPassword = result.password as string;
    productModel.create({
        'name' : 'Iphone',
        'price' : 5000,
        'category' : 'Mobiles'
    })

});

describe("User Model", () : void => {
    it('should have an index method', () : void => {
        expect(userModel.index).toBeDefined();
    });

    it('should have a show method', () : void  => {
        expect(userModel.show).toBeDefined();
    });

    it('should have a find method', () : void  => {
        expect(userModel.find).toBeDefined();
    });

    it('should have a create method', () : void  => {
        expect(userModel.create).toBeDefined();
    });

    it('should have a authenticate method', () : void  => {
        expect(userModel.authenticate).toBeDefined();
    })

    it('index method should return a list of users', async () : Promise<void|User[]> => {
        const result = await userModel.index();
        expect(result).toEqual([{
            id: 1,
            first_name: 'Sherif Hesham',
            last_name:'Hassan Moustafa',
            password : hashedPassword
        }]);
    });

    it('show method should return the correct user', async  () :Promise<void|User> => {
        const result = await userModel.show("1");
        expect(result).toEqual({
            id: 1,
            first_name: 'Sherif Hesham',
            last_name:'Hassan Moustafa',
            password: hashedPassword
        });
    });
    
    it('find method should return the correct user', async  () :Promise<void|User> => {
        const result = await userModel.find(hashedPassword);
        expect(result).toEqual({
            id: 1,
            first_name: 'Sherif Hesham',
            last_name:'Hassan Moustafa',
            password: hashedPassword
        });
    });
    
    it('authenticate method should return the correct user', async  () :Promise<void|User> => {
        const result = await userModel.authenticate("Sherif Hesham","12345678");
        
        expect(result?.password).toEqual(hashedPassword);
    });
});

describe('Users APIs ', () => {
    it('POST /users password less than 8 char return 400 ', async () :Promise<void> => {
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

    it('POST /users first name not snet return 400', async ():Promise<void> => {
        const body = {   
            "last_name" : "El doksh",
            "password" : "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });

    it('POST /users last name not snet return 400 ', async ():Promise<void> => {
        const body = {
            "first_name" : "El doksh",
            "password" : "1234567"
        };
        await request.post('/users')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });
    
    it('POST /users/login login with created user return 200', async () :Promise<void>=> {
        const body = {   
            "first_name" : "Sherif Hesham",
            "password" : "12345678"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(200)
    });
    
    it('POST /users/login login incoreect credentials return 400', async ():Promise<void> => {
        const body = {   
            "first_name" : "Sherif",
            "password" : "12345"
        };
        await request.post('/users/login')
            .set('Accept', 'application/json')
            .send(body)
            .expect(400)
    });
    
    it('GET /users return 401 without token', async ():Promise<void> => {
        await request.get('/users').expect(401);
    });
    
    it('GET /users return 200 with valid token', async () :Promise<void>=> {
        const res = await request.get('/users').set('Authorization', `Bearer ${token}`) 
        expect(res.status).toEqual(200)
    });
    
    it('GET /users/1 return 401 without token', async ():Promise<void> => {
        await request.get('/users/1').expect(401);
    });
    
    it('GET /users/1 return 200 with valid token', async ():Promise<void> => {
        const res = await request.get('/users/1').set('Authorization', `Bearer ${token}`) 
        expect(res.status).toEqual(200)
    });
});
