import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./database/configDb.js"
import userRouter from "./routes/user.routes.js"

dotenv.config()
connectDb()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", userRouter)

app.listen(process.env.PORT, () => {
    console.log("your app is listening to the port:" + process.env.PORT)
})
