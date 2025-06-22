"use client";
 
import React from "react";
import { Navbar } from "@material-tailwind/react";
import { SearchBar } from "./SearchBar";
import { SignInButton } from "./SignInButton";
import { LogOutButton } from "./LogOutButton";
import Link from "next/link";

 
interface NavbarDefaultProps {
  loggedIn?: boolean;
  className?: string; 
}

export const NavbarDefault: React.FC<NavbarDefaultProps> = ({ loggedIn, className }) => {
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <a href="/listings" className="text-white text-lg">
          Listings
        </a>
      </li>
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <a href="#" className="text-white text-lg">
          Account
        </a>
      </li>
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <a href="#" className="text-white text-lg">
          Blocks
        </a>
      </li>
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <a href="#" className="text-white text-lg">
          About
        </a>
      </li>
    </ul>
  );

  // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   const authToken = getCookie("authToken");
  //   setLoggedIn(authToken === "true");
  // }, []);
 
  return (
    <Navbar
      className={`mx-auto px-2 py-2 lg:px-16 lg:py-4 bg-background border-none rounded-none ${className || ""}`}
      placeholder="Navbar Placeholder"
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="h-full flex items-center justify-left text-blue-gray-900">
        <Link href="/">
          <img
            className="h-12 object-contain"
            src="corner-white.png"
            alt="Logo"
          ></img>
        </Link>
        <SearchBar
          placeholder="Search for rackets, strings, grips, etc." />
        <div className="block">{navList}</div>
        { loggedIn && <LogOutButton className="ml-auto" /> }
        { !loggedIn && <SignInButton className="ml-auto" /> }
      </div>
    </Navbar>
  );
}