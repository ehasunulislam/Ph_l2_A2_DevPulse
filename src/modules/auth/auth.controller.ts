import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

// sign up function
const createUser = async(req: Request, res: Response) => {
    try{
        const result = await authService.createUserFromDB(req.body);

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

// login function 
const loginUser = async(req: Request, res: Response) => {
    try{
        const result = await authService.loginUserFromDB(req.body);

        res.status(200).json({
            success: true,
            message: "User login successfully!",
            data: result,
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
    createUser,
    loginUser
}