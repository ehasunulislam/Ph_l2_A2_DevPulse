import { pool } from "../../db/index.db.js";
import type { Interface_of_user } from "./user.interface.js";

const createUserFromDB = async (payload: Interface_of_user) => {
    const  {name, email, password, is_active} = payload;

    const result = await pool.query(
        `
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING *
        `,
        [name, email, password]
    );

    return result
}

export const userService = {
    createUserFromDB
}