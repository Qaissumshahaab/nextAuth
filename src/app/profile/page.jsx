"use client";
import { useEffect,useState } from "react";
import Link from "next/link";

 

 export default  function ProfilePage() {
     const [id, setId] = useState(null);
     
     useEffect(()=>{
         const fetchUserData= async()=>{
             try{   
                    const response= await fetch("/api/users/me");
                    if(response.ok){
                        const data= await response.json();
                        const ID= data?.user?._id;
                        console.log("User data from token:", data);
                      setId(ID);

                    }
                    else{
                        console.error("Failed to fetch user data from token");
                    }
                }
                catch(error){
                    console.error("Error fetching user data from token:", error);
                }
            };
            fetchUserData();
        }, []);

        const idfromToken= id;


        
    return (
        <div>
            <h1>Profile Page</h1>
            <Link href={`/profile/${idfromToken}`}>{idfromToken}</Link>
        </div>
    );
}