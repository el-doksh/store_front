import database from '../database';
import bcrypt from 'bcrypt';

export type User = {
    first_name: String;
    last_name: String;
    password : String;
}
var pepper = process.env.BCRYPT_PASSWORD as string;

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
    
    async find(password: string): Promise<User|null> {
        try {
            const sql = 'SELECT * FROM users WHERE password=($1)'
            const conn = await database.connect()
            const result = await conn.query(sql, [password])
            conn.release()
            
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find User Error: ${err}`)
        }
    }
    
    async create(u: User): Promise<void> {
        try {
            
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await database.connect();
            const saltRounds = process.env.SALT_ROUNDS as string;
            const password = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.first_name, u.last_name, password])
            conn.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`)
        }
    }

  
    async authenticate(first_name: string, password: string) : Promise<User | null> {
        
        const sql = 'select password from users where first_name = $1';
        const conn = await database.connect();
        const result = await conn.query(sql, [first_name]);

        if(result.rows.length > 0) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password+pepper, user.password)) {
                return user
            }
        }
        return null;
    }
}
