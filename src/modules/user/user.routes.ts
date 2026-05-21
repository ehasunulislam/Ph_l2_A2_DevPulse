import { Router } from "express";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";


const router = Router();

// get all users 
router.get("/", auth("maintainer"), userController.getAllUsers)


export const userRoute = router;