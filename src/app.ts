import express, { type Request, type Response } from "express"

const app = express();

// middleware
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


export default app