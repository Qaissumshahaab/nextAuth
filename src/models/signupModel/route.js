import { verifyToken } from "@/helpers/verifyToken";
import mongoose from "mongoose";


const signupSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
    
    isVerified:{
        type:Boolean,
        default:false,
    }

})

const Signup = mongoose.models.Signup || mongoose.model("Signup",signupSchema);
export default Signup;