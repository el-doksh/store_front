import supertest from 'supertest';
import app from '../../server';
import { ProductModel, Product } from '../products';
import { token } from './usersSpec';

const request = supertest(app);

const productModel = new ProductModel()


describe("Product Model", () :void=> {
    it('should have an index method', () : void => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a mostPopular method', () : void  => {
        expect(productModel.mostPopular).toBeDefined();
    });

    it('should have a show method', () : void  => {
        expect(productModel.show).toBeDefined();
    });

    it('should have a create method', () : void  => {
        expect(productModel.create).toBeDefined();
    });

    it('should have a productsByCategory method', () : void  => {
        expect(productModel.productsByCategory).toBeDefined();
    })

    it('index method should return a list of products', async () : Promise<void|Product[]> => {
        const result = await productModel.index();
        expect(result).toEqual([{
            'id': 1,
            'name' : 'Iphone',
            'price' : 5000,
            'category' : 'Mobiles'
        }]);
    });

    it('mostPopular method should return a list of products', async () : Promise<void|Product[]> => {
        const result = await productModel.mostPopular();
        
        expect(result).toEqual([{
            id: 1,
            name: 'Iphone',
            price: 5000,
            category: 'Mobiles',
            quantity: 1
        }]);
    });
    
    it('productsByCategory method should return a list of products', async () : Promise<void|Product[]> => {
        const result = await productModel.productsByCategory('Mobiles');
        expect(result).toEqual([{
            'id': 1,
            'name' : 'Iphone',
            'price' : 5000,
            'category' : 'Mobiles'
        }]);
    });
});

describe('Products API ', () :void=> {
    it('POST /products without token return 401', async () :Promise<void>=> {
        const body = {   
            "name" : "product 1",
            "price" : 50,
            "category" : "category"
        };
        await request.post('/products')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401)
    });

    it('POST /products wrong price return 400', async ():Promise<void> => {
        const body = {   
            "name" : "product 1",
            "price" : "string price",
            "category" : "category"
        };
        await request.post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
    });
    
    it('POST /products no name return 400', async ():Promise<void> => {
        
        const body = {   
            "price" : "string price",
            "category" : "category"
        };

        await request.post('/products')
                    .set('Authorization', `Bearer ${token}`)
                    .send(body)
                    .expect(400)
    });
    
    it('POST /products no price return 400', async ():Promise<void> => {
        const body = {
            "name" : "prodct",
            "category" : "category"
        };
    
        await request.post('/products')
        .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
    });
    
    it('POST /products no category return 400', async ():Promise<void> => {
        const body = {   
            "name" : "name",
            "price" : 40
        };
    
        await request.post('/products').set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
    });
    
    it('POST /products valid request return 200', async ():Promise<void> => {
        
        const body = {   
            "name" : "Iphone",
            "price" : 40,
            "category" : "Mobile"
        };
    
        await request.post('/products')
        .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
    });
    
    it('GET /products expect 200', async ():Promise<void> => {
        await request.get('/products').expect(200);
    });
    
    it('GET /products/1 return 200', async ():Promise<void> => {
        await request.get('/products/1').expect(200);
    });
    
    it('GET /products/100 return 400', async ():Promise<void> => {
        await request.get('/products/100').expect(400)
    });
    
    it('GET /most_popular_products return 200', async ():Promise<void> => {
        await request.get('/most_popular_products').expect(200)
    });
    
    it('GET /products/category/Mobiles return 200', async ():Promise<void> => {
        await request.get('/products/category/Mobiles').expect(200);
    });
});