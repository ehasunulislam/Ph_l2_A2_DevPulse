import express, { type Request, type Response } from "express"
import { authRoute,  } from "./modules/auth/auth.routes.js";
import { userRoute } from "./modules/user/user.routes.js";
import { isuueRouter } from "./modules/issues/issue.routes.js";

const app = express();

// middleware
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// all routes
app.use("/api/auth", authRoute);
app.use("/api/auth", authRoute);


app.use("/api/users", userRoute)


app.use("/api/issues", isuueRouter)


export default app