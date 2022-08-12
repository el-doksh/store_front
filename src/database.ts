import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_TEST_NAME,
    ENV
} = process.env;

let dbCredentials;

if (ENV === 'dev') {
    dbCredentials = {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    }
} else if (ENV === 'test') {
    dbCredentials = {
        host: DB_HOST,
        database: DB_TEST_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    }
}

const database = new Pool(dbCredentials)

export default database;