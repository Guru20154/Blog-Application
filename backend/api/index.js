import connectDB from "../src/db/index.js";
import dotenv from "dotenv";
import { app } from "../src/app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
    app.on("error", (error)=>{
        console.log("App listening Error:",error)
    })
})
.catch((err)=>{
    console.log("MongoDB conn failed:",err)
})