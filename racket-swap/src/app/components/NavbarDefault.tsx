"use client";
 
import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { SearchBar } from "./SearchBar";
import { SignInButton } from "./SignInButton";
 
export const NavbarDefault = () => {
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="/listings" className="flex items-center">
          Listings
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="mx-auto px-2 py-2 lg:px-16 lg:py-4 bg-[--background] border-none">
      <div className="h-full flex items-center justify-left text-blue-gray-900">
        <img
          className="h-12 object-contain"
          src="corner-white.png"
          alt="Logo"
        ></img>
        <SearchBar
          placeholder="Search for rackets, strings, grips, etc." />
        <div className="block">{navList}</div>
        <SignInButton className="ml-auto" />
      </div>
    </Navbar>
  );
}