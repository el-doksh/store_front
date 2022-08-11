import database from '../database';

export type Order = {
    user_id: Number;
    status : string; //active | completed
}

export type addProduct = {
    quantity: Number;
    order_id: Number;
    product_id: Number;
}

export class OrderModel {
    async index(userId : number): Promise<Order[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders where user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error (`Cannot connect ${err}`);
        }
    }
    
    async completed(userId : number): Promise<Order[]> {
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM orders where user_id=($1) and status='completed'";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error (`Cannot connect ${err}`);
        }
    }
    
    async show(id: number, userId : number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1) and user_id=($2)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id, userId])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`)
        }
    }
    
    async create(ord: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            const conn = await database.connect()            
            const result = await conn.query(sql, [ord.user_id, ord.status])
            const Order = result.rows[0]
            conn.release()
            return Order
        } catch (err) {
            throw new Error(`Could not add new Order Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<addProduct|null> {
        try {
            const conn = await database.connect()
            const insertProductSql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(insertProductSql, [quantity, orderId, productId])
            const orderProduct = result.rows[0]
            conn.release()
        
            return orderProduct
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
}
