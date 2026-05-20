import express, { type Request, type Response } from "express"
const app = express()
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Server running')
})

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`)
})