import { Pool } from "pg";
import config from "../config/index.config.js";

export const pool = new Pool({
    connectionString: config.connection_string
});

const initDB = async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20),
                email VARCHAR(20) UNIQUE NOT NULL,
                is_active BOOLEAN DEFAULT true,
                password TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
         `)

        console.log("Database connected successfully!");
    }
    catch(err) {
        console.log(err);
    }
}


export default initDB