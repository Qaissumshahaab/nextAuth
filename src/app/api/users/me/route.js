import { verifyToken } from "@/helpers/verifyToken";
import { NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Signup from "@/models/signupModel/route";

export const GET= async (request)=>{
    try{
  const datafromToken= verifyToken(request);
    await dbConnect();
    const user=await Signup.findById(datafromToken.userId).select("-password");
    if(!user){
        return NextResponse.json({message:"User not found"}, {status:404});
    }
    else{
        return NextResponse.json({user}, {status:200});
    }
    }
    catch(error){
        throw new Error("Something wrong happen while fetching user data from token ", { cause: error });
    }
}