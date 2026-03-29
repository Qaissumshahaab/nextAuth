import mongoose from "mongoose";
import Signup from "@/models/signupModel/route";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import  {dbConnect}  from "@/dbConfig/dbConnect";
import { sendEmail } from "@/helpers/nodemailing";

export async function POST(request){
    try {
        await dbConnect();
        const {email,password} = await request.json();
        const existingUser = await Signup.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"}, {status:400});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new Signup({
            email,
            password:hashedPassword,
        });
        await newUser.save();
        
        // send verification email here using nodemailer to verify the user's email address
         await sendEmail({email, emailType: 'VERIFY', userId: newUser._id});

        return NextResponse.json({message:"User created successfully"}, {status:201});
    } catch (error) {
        console.error("Error during signup:", error);
        return NextResponse.json({message:"Internal server error"}, {status:500});
    }
}