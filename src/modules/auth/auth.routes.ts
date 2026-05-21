import { Router } from "express";
import { userController } from "./auth.controller.js";

const router = Router()

// 1. sign up route
router.post("/signup", userController.createUser)

// 2. login route
router.post("/login", userController.loginUser)


export const userRoute = router;