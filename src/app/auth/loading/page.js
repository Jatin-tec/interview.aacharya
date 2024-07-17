"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import "./index.css";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

const SocialAuth = () => {
  let location = useSearchParams();
  console.log("location", location);
  
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const code = location.get('code') ? location.get('code') : null;
    console.log("code", code);
    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = async (code) => {
    try {
          const res = await axios.get(`${BACKEND_API_URL}/api/auth/login/google/?code=${code}`)
          console.log("res", res)
          localStorage.setItem("goggleFirstName", res.data.user.first_name)
          return res.data;
      } catch (err) {
          console.log("error", err);
          return err;
      }
  };

  const onGogglelogin = async () => {
    const response = await googleLoginHandler(location.get('code'))
    console.log(response)
  }

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
        <small className=" text-center mr-2">
          Just a moment
        </small>
    </div>
  );
};


export default SocialAuth;