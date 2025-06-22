"use client";

import React, { useState } from "react";
import Form from "next/form"
import Input from "../components/Input";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);

    if (isEmailValid && firstName && lastName && password) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log("Registration successful:", data);
          alert("Registration Successful! Please log in.");
          // Optionally redirect to login page
          // window.location.href = "/auth/login";
        } else {
          console.error("Registration failed:", data);
          alert(data.error || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center bg-white">
      <div className="w-full max-w-md">
          <div className="w-5/8 relative mx-auto">
              <p className="text-gray-600 text-center">Enter your details, and we&apos;ll make sure a human gets in touch with you</p>
          </div>
          <Form className="w-5/8 mx-auto mt-8" onSubmit={handleRegister} action="">
            <Input 
              type="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              className="text-gray-800 text-sm" />
            <Input 
              type="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-gray-800 mt-8" />
            <Input 
              type="email" 
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)} 
              className="text-gray-800 text-sm mt-8"
              isValid={isEmailValid} />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-800 mt-8"
            />
            <Button
              type="submit"
              variant="filled"
              color="blue"
              className={`w-full rounded-sm justify-center lg:py-3 mt-8 bg-[#b9b9b9]`}
              onClick={() => {}}
              disabled={false}
              placeholder="Sign In"
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}>
              Let&apos;s go
            </Button>
            <Link href="login" className="text-blue-400 text-xs mt-12 block text-center">
              I already have an account
            </Link>
          </Form>
      </div>
    </div>
  );
}
