import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(401).json({message: "User already exists"})
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        res.status(200).json({message: "User registered successfully", data: {id: user._id,name: user.name,email:user.email}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user =await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User not found,please register"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message: "Incorrect Password"})
        }
        const token =await jwt.sign({email:user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
        user.token = token
        await user.save()
        res.status(200).json({message: "Login Successful", data: {name:user.name,email:user.email, token: token}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getUser = async(req, res) => {
    try {
        const {email} = req.user
        const user = await User.findOne({email})
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting user"})
    }
}

export const getAllUser = async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting All user"})
    }
}