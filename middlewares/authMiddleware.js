import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"


// protected route

export const requireSignIn = async(req,res,next) =>{
    try{

        const decode  = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()

    }catch(error){
        console.error(error.message || error)
        return res.status(400).json({
            message: "Not authorized, token is required"
        })
    }
}

export const isAdmin = async(req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role == 0){
            return res.status(403).json({
                sucess:false,
                message: "Not authorized, you are not an admin"
            })
        }else{
            next()
        }
    } catch (error) {
        console.error(error.message || error)
        return res.status(401).json({
            success:false,
            message: "Error in admin middleware"
        })
    }
}

