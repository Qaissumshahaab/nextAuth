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
})

const Signup = mongoose.model("Signup",signupSchema);
export default Signup;