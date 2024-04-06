import express, { Express, Request, Response } from "express";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello world!" })
})

app.listen(3000, () => {
    console.log('Server up!')
    console.log('http://localhost:3000')
})