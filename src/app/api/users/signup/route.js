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
       const user = await newUser.save();

        // Send verification email to the user to verify their account
        await sendEmail(email, 'VERIFY', user._id);
        

        return NextResponse.json({message:"User created successfully"}, {status:201});
    }
    
    catch (error) {
  console.error("Signup API ERROR:", error);
  return NextResponse.json(
    { error: error.message },
    { status: 400 }
  );
}
}