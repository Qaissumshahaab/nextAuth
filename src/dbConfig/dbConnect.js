import mongoose from "mongoose";

export async function dbConnect(){

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Database connected successfully");
        });

        connection.on("error",(err)=>{
            console.log("Error while connecting to database",err.message);
        });
     }
    
    catch(error){
        console.log("Some error occur while connecting to database",error.message);
    }
}