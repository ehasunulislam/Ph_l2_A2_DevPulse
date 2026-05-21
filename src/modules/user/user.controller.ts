import type { Request, Response } from "express";
import { userService } from "./user.service.js";

// Getall User function 
const getAllUsers = async (req: Request, res: Response) => {
    try{
        const result = await userService.getAllUserFromDB();

        res.status(200).json({
            success: true,
            message: "Users retrived successfully!",
            data: result.rows,
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
    getAllUsers
}