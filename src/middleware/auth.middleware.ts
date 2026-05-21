import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/index.config.js";
import { pool } from "../db/index.db.js";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token received",
        });
      }

      const decoded = jwt.verify(token, config.secretJWT as string) as JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [decoded.email]
      );

      if (userData.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const user = userData.rows[0];

      // Role check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access - You do not have permission",
        });
      }

      // Attach user info to request if needed
      req.user = user; // Optional, if you need it in subsequent middlewares/controllers

      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: err.message,
      });
    }
  };
};

export default auth