import express, { type Request, type Response } from "express"
import { userRoute } from "./modules/users/user.routes.js";

const app = express();

// middleware
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// all routes
app.use("/api/users", userRoute);


export default app