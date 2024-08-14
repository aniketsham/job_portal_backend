import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import fileUpload from "express-fileupload";
import userRouter from "./Routes/userRouter.js";
import jobRouter from "./Routes/jobRouter.js";
import applicationRouter from "./Routes/applicationRouter.js"
import { newsLetterCorn } from "./automation/newsLetterCorn.js";
const app=express()
config({path:"./config/config.env"})

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    credentials:true,
    
}))
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)
newsLetterCorn();
connection();
app.use(errorMiddleware)
export default app
