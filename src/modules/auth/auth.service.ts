import config from "../../config/index.config.js";
import { pool } from "../../db/index.db.js";
import type { Interface_of_user } from "../user/user.interface.js";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

// =========================
// createUser from database 
// =========================
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

    return result;
};


// =========================
// Login User from database 
// =========================
const loginUserFromDB = async (payload: {
    email: string; 
    password: string;
}) => {
    const { email, password } = payload;

    // 1. Check if the user exists
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `, [email])

    if(userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }

    // 2. compare password
    const user = userData.rows[0];
    const mathchPassword = await bcrypt.compare(password, user.password);

    if(!mathchPassword) {
        throw new Error("Password Doesn't match")
    }

    // 3. added the jwt accesstoken function 
    const jwtPayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email
    }

    const accesstoken = jwt.sign(jwtPayload, config.secretJWT as string, {
        expiresIn: "1d"
    });

    return { 
        accesstoken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        },
    }
}

export const authService = {
    createUserFromDB, 
    loginUserFromDB
}