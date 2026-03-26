"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import  {useRouter}  from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:3000/api/users/login",user);
    if (response.status === 200) {
      alert(response.data.message)
     // router.push(`/profile/${response.data.userId}`);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login Page</h1>
      <input onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" /> <br/>
      <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" /> <br />
      <button onClick={handleLogin}>Login</button>
    </div>
    
  );
}