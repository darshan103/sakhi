import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address,answer} = req.body;

        // Validations
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone No is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        if(!answer){
            return res.send({message:'Answer is required'})
        }

        // check user 
        const existingUser = await userModel.findOne({email})
        // existing user
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already register please login !',
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()
        res.status(201).send({
            success:true,
            message:'User register successfully',
            user,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        })
    }
};

// POST
export const loginController = async(req,res) => {
    try{
        const {email,password}=req.body;
        // Validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                massage:'Invalid email or password',
            })
        }
        // check user is exist or not
        const user = await userModel.findOne({email})
        // validation of user
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register',
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            })
        }
        // token
        const token = await JWT.sign({_id:user.id},process.env.JWT_secret,{
            expiresIn: "365d",
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}

export const forgotPasswordController = async(req,res) => {
    try{
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New password is required"})
        }
        
        // check
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong email or answer"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password reset successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
};

// test controller
export const testController = (req,res) => {
    res.send("protected routes");
}
