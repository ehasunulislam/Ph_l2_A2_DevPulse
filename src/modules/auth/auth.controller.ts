import type { Request, Response } from "express";
import { userService } from "./auth.service.js";

const createUser = async(req: Request, res: Response) => {
    try{
        const result = await userService.createUserFromDB(req.body);

        res.status(201).json({
            success: true,
            message: "User Created successfully!",
            data: result.rows[0],
        });
    }
    catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
}

export const userController = { 
    createUser
}