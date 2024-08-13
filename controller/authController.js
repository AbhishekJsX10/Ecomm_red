

import { hashPassword, comparePassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const registerController = async(req,res) =>{
    try {
        
        const {name,email,password,phone,address,role} = req.body 

        // validation 
        if(!name || !email || !password || !phone || !address){
            return res.status(404).json({
                success: false,
                message: 'please fill all the detailss!!'
            })    
        }

        // checking pre-existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: `${email} already exists Please Login !!`
            })    
        }

        // password hashing
        const hassedPasword = await hashPassword(password)

        // creating new user and saving it 
        const newUser = await userModel.create({
            name,
            email,
            password:  hassedPasword,
            phone,
            address
        })

        return res.status(200).json({
            success: true,
            message: 'User registered Successfully!!',
            user: newUser  // returning the created user object
        })

    } catch (error) {
        console.error(error.message || error)
        return res.status(500).json({
            success: false,
            message: `Server Error occured in registering user ${error}`
        })
    }
}

export const loginController = async(req,res) =>{
    try {
        let {email,password}  =  req.body
        // validation
        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: 'Please fill all the details!!'
            })
        }

        // fetching user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success: false,
                message: `${email} is not register!!`
            })
        }

        // checking Password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(404).json({
                success: false,
                message: `Password is incorrect!! (Invalid credentials)`
            })
        }

        // creation of token
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn: '1h'
        })

        return res.status(200).cookie("token",token).json({
            success: true,
            message: 'User logged in Successfully!!',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                image:user.image,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error.message || error)
        return res.status(500).json({
            success: false,
            message: `Server Error occured in login user`,
            error
        })
    }
}


export const logoutController = () =>{

}


// test route protected One
export const testController = async(req,res) =>{
    res.send("protected route prinnts hello")
}