

import express from "express"
import morgan from "morgan"
import connectToDB from "./config/db.js"
import dotenv from "dotenv";
import cors from "cors"

// routes imports
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

// Dot env config 
dotenv.config(); 

// database config
connectToDB()

// rest obj
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


// routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)


// base URL
app.get("/",(req,res)=>{
    res.send("Welcome to backend of Ecommerce Application !")
})


// PORT
const PORT = process.env.PORT 

// run listen
app.listen(PORT,()=>console.log(`server is runing in ${process.env.DEV_MODE} on PORT ${PORT}`))