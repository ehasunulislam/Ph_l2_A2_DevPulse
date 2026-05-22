import { pool } from "../../db/index.db.js"

// =========================
// getAll user from DB 
// =========================
const getAllUserFromDB = async () => {
    const result  = await pool.query(`
            SELECT * FROM users
        `)

    return result
}


export const userService = {
    getAllUserFromDB
}