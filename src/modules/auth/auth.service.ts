import { pool } from "../../db/index.db.js";
import type { Interface_of_user } from "../user/user.interface.js";
import bcrypt from "bcrypt"

const createUserFromDB = async (payload: Interface_of_user) => {
    const  {name, email, password, role} = payload;

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
        `
            INSERT INTO users(name, email, password, role)
            VALUES($1, $2, $3, COALESCE($4, 'contributor'))
            RETURNING *
        `,
        [name, email, hashedPassword, role]
    );

    delete result.rows[0].password

    return result
}

export const userService = {
    createUserFromDB
}