import supertest from 'supertest';
import app from '../../server';
import { OrderModel, Order, addProduct } from '../orders';
import { token } from './usersSpec';

const request = supertest(app);

const orderModel = new OrderModel();


describe("Order Model", () => {
    it('should have an index method', () : void => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a completed method', () : void  => {
        expect(orderModel.completed).toBeDefined();
    });

    it('should have a show method', () : void  => {
        expect(orderModel.show).toBeDefined();
    });

    it('should have a create method', () : void  => {
        expect(orderModel.create).toBeDefined();
    });

    it('should have a addProduct method', () : void  => {
        expect(orderModel.addProduct).toBeDefined();
    })

    it('create method should return a list of orders', async () : Promise<void|Order[]> => {
        const result = await orderModel.create({
            user_id : '1',
            status: 'completed'
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status : 'completed',
        });
    });

    it('addProduct method should return a list of orders', async () : Promise<void|Order[]> => {
        const result = await orderModel.addProduct(1, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 1,
            order_id: '1',
            product_id: '1'
        });
    });

    it('index method should return a list of orders', async () : Promise<void|Order[]> => {
        const result = await orderModel.index(1);
        expect(result).toEqual([{
            id: 1,
            user_id: '1',
            status : 'completed',
        }]);
    });

    it('completed method should return a list of orders', async () : Promise<void|Order[]> => {
        const result = await orderModel.completed(1);
        expect(result).toEqual([{
            id: 1,
            user_id: '1',
            status : 'completed',
        }]);
    });
    
    it('show method should return a list of orders', async () : Promise<void|Order[]> => {
        const result = await orderModel.show(1, 1);
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status : 'completed',
        });
    });
});

describe('Orders API ', () => {
    it('POST /orders without token return 401', async () => {
        const body = {
            "status" : "completed"
        };
        await request.post('/orders')
            .set('Accept', 'application/json')
            .send(body)
            .expect(401)
    });
    
    it('POST /orders without status return 400', async () => {
        await request.post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
    });
    
    it('POST /orders valid status return 200', async () => {
        const body = {   
            "status" : "completed"
        };
        await request.post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
    });
    
    it('GET /orders expect 200', async () => {
        await request.get('/orders').set('Authorization', `Bearer ${token}`).expect(200);
    });
    
    it('GET /orders without token expect 401', async () => {
        await request.get('/orders').expect(401);
    });
    
    it('GET /orders/1 return 200', async () => {
        await request.get('/orders/1').set('Authorization', `Bearer ${token}`).expect(200);
    });
    
    it('GET /orders/1 without token expect 401', async () => {
        await request.get('/orders/1').expect(401);
    });
    
    it('GET /orders/100 return 400', async () => {
        await request.get('/orders/100').set('Authorization', `Bearer ${token}`).expect(400);
    });
    
    it('GET /orders_completed return 200', async () => {
        await request.get('/orders_completed').set('Authorization', `Bearer ${token}`).expect(200);
    });
    
    it('POST /addProduct return 400', async () => {
        const body = {
            "quantity" : 5,
            "order_id" : 50,
            "product_id" : 12
        };
        await request.post('/addProduct')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
    });
})