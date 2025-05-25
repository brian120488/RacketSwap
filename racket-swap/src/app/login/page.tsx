"use client";

import Image from "next/image";
import Form from "next/form"
import Input from "./components/Input";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left Section: Login Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="w-full max-w-md">
            <div className="relative content-center size-16 mx-auto">
                <Image
                  src="/icon-empty.png"
                  alt="Logo"
                  fill={true}
                  className="object-contain"
                />
            </div>
            <Form className="w-5/8 mx-auto mt-8">
              <Input type="email" className=""/>
              <Input type="password" className="mt-8"/>
              <Button
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

      {/* Right Section: Image */}
      <div className="flex-1 flex justify-center items-center bg-[#f9f0e7]">
        <div className="relative w-1/2 h-1/2">
          <Image
            src="/login-image.png"
            fill={true}
            alt="Login Image"
          />
        </div>
      </div>
    </div>
  );
}
