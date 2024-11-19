import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
    origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2],
    credentials: true,     
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blog-application-g3dv.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Crendentials', true);
    next();
});
  

app.options('*', cors());  // Handle preflight requests

app.use(express.json({limit: "15kb"}))
app.use(express.urlencoded({extended: true, limit: "15kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)

export { app }