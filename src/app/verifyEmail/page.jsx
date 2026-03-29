"use client"

import axios from "axios";
import { useState, useEffect } from "react";



export default  function VerifyEmail() {

    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);

      useEffect( () => {
        const verifyEmail=async()=>{
         const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        const response= await axios.post('/api/users/verifyEmail', { token });
        setMessage(response.data.message);
        setIsVerified(response.data.isVerified);
        }
        verifyEmail();
      }, []);

      const showVerificationMessage=()=>{
        alert(message);
      }


      return(
        <button onClick={()=>showVerificationMessage()} >Verify me</button>
      )
}