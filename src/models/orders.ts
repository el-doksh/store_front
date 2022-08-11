import database from '../database';

export type Order = {
    id: Number;
    product_id: Number;
    quantity: Number;
    user_id: Number;
    status : Boolean;
}

export class OrderModel {
    async index(): Promise<Order[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error (`Cannot connect ${err}`);
        }
    }
    
    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`)
        }
    }
    
    async create(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
            const conn = await database.connect()            
            const result = await conn.query(sql, [order.product_id, order.quantity, order.user_id, order.status])
            const Order = result.rows[0]
            conn.release()
            return Order
        } catch (err) {
            throw new Error(`Could not add new Order ${order.product_id}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            const Order = result.rows[0]
            conn.release()
            return Order
        } catch (err) {
            throw new Error(`Could not delete Order ${id}. Error: ${err}`)
        }
    }
}
