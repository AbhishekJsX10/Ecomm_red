import mongoose from "mongoose"
import dotenv from "dotenv"

const connectToDB = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://githubabhishekchaturvedi0:Mb8fvlma9xFV8OgE@ecomerceredwhite.wzoaj.mongodb.net/" ,{dbName:"Ecommerce_Application_RedWhite"})
        console.log(`MongoDB Connected`)
    }catch(err){
        console.error("Error connecting to MongoDB",err)
    }
}

export default connectToDB