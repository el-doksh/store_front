import database from '../database';

export type Product = {
    id: Number;
    name: String;
    price : Number;
    category : String;
}

export class ProductModel {
    
    async index(): Promise<Product[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error (`Cannot connect ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`)
        }
    }
    
    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3, $4) RETURNING *'
            const conn = await database.connect()            
            const result = await conn.query(sql, [product.name, product.price, product.category])
            const Product = result.rows[0]
            conn.release()
            return Product;
        } catch (err) {
            throw new Error(`Could not add new Product ${product.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            const Product = result.rows[0]
            conn.release()
            return Product
        } catch (err) {
            throw new Error(`Could not delete Product ${id}. Error: ${err}`)
        }
    }
}
