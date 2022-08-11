import database from '../database';

export type User = {
    first_name: String;
    last_name: String;
    password : String;
}

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await database.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error (`Cannot connect ${err}`);
        }
    }
    
    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`)
        }
    }
    
    async create(input: User): Promise<void> {
        try {
            
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await database.connect();
            const result = await conn.query(sql, [input.first_name, input.last_name, input.password])
            conn.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new User ${input.first_name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [id])
            const User = result.rows[0]
            conn.release()
            return User
        } catch (err) {
            throw new Error(`Could not delete User ${id}. Error: ${err}`)
        }
    }
}
