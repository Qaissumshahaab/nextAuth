import Signup from "@/models/signupModel/route";
import { dbConnect } from "@/dbConfig/dbConnect";

export async function POST(request) {
    await dbConnect();

    try{
        const reqbody= await request.json();
        const {token}=reqbody;
        const user=await Signup.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return new Response(JSON.stringify({message:'Invalid or expired token'}),{status:400});
        }
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return new Response(JSON.stringify({message:'Email verified successfully' ,isVerified:user.isVerified}),{status:200});
    } 
     catch (error) {
        return new Response(JSON.stringify({message:'Error verifying email'}),{status:500});

    } 
}