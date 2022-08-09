import database from '../database';

export type User = {
    id: Number;
    name: String;
    is_active : Boolean;
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
}
