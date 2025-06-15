"use client";

import React, { useState } from "react";
import Form from "next/form"
import Input from "../components/Input";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log("Response data:", data);
        if (res.ok) {
          alert("Login Successful");
        } else {
          alert(data.error || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  };  

  return (
    <div className="flex-1 flex justify-center items-center bg-white">
      <div className="w-full max-w-md">
          <div className="relative size-16 mx-auto">
              <Image
                src="/icon-empty.png"
                alt="Logo"
                fill={true}
                className="object-contain"
              />
          </div>
          <Form className="w-5/8 mx-auto mt-8" onSubmit={handleSignIn}>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)} 
              className="text-gray-800 text-sm"
              isValid={isEmailValid} />
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-8" />
            <Button
              type="submit"
              variant="filled"
              color="blue"
              className={`w-full rounded-sm justify-center lg:py-3 mt-8 bg-[#b9b9b9]`}>
              Sign In
            </Button>
            <Link href="forgot-password" className="text-blue-400 text-xs mt-12 block text-center">
              Forgot Password?
            </Link>
            <Link href="register" className="text-blue-400 text-xs mt-2 block text-center">
              Don't have an account?
            </Link>
          </Form>
      </div>
    </div>
  );
}
