"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";




export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

    const onSignup = async (e) => {
      e.preventDefault();
      const response =await axios.post("http://localhost:3000/api/users/signup", user);
      if (response.status === 201) {
        router.push("/login");
      }
    }


  return (
    <div>
      <h1 className="text-center">Signup Page</h1>
      <label htmlFor="email" >Email:</label>
      <input onChange={(e)=>setUser({...user,email:e.target.value})} type="email" value={user.email} id="email" name="email" placeholder="enter email" required /> <br/>
      <label htmlFor="password" >Password:</label>
      <input onChange={(e)=>setUser({...user,password:e.target.value})} type="password" value={user.password} id="password" name="password" placeholder="enter password" required /> <br/>
      <button onClick={onSignup} type="submit">Sign Up</button> <hr/>
      <p>Already have an account?--<Link href="/login">Login</Link></p>
    </div>
  );
}