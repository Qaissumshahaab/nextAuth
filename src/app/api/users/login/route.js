import mongoose from "mongoose";
import Signup from "@/models/signupModel/route";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import  {dbConnect}  from "@/dbConfig/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request){
    try{
        await dbConnect();
        const {email,password} = await request.json();
        const user = await Signup.findOne({email});
        if(!user){
            return NextResponse.json({message:"User does not exist"}, {status:400});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return NextResponse.json({message:"Invalid email or password"}, {status:400});
        }
        const token = jwt.sign(
            {userId:user._id,email:user.email,},
            process.env.TOKEN_SECRET,
            {expiresIn:"1h"}
        );

        const response = NextResponse.json({message:"Login successful"}, {status:200});
        response.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24});
        return response;
    }
    catch(error){
        console.error("Error during login:", error);
        return NextResponse.json({message:"Internal server error"}, {status:500});
    }
}