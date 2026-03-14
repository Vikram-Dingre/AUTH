import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import globalErrorHandler from "./utils/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"

dotenv.config({
    path:"./src/.env"
})

//signup/login/logout
//hashing
//jwt
//mogoose method,statics,middlewares(hooks)
//secure Route (protected Routes)

const app = express();

// Middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:['GET,HEAD,PUT,PATCH,POST,DELETE']
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))

app.use(cookieParser())

//routes
app.use("/auth",authRouter);

//globalErrorHandler
app.use(globalErrorHandler);


export default app;
