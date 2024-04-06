import express, { Express, Request, Response } from "express";
import cors from 'cors'

const app = express();
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "This message is from the backend" })
})

app.listen(3000, () => {
    console.log('Server up!')
    console.log('http://localhost:3000')
})