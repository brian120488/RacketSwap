"use client";

import Link from 'next/link'
import { Button } from "@material-tailwind/react";

interface SignInButtonProps {
  className?: string;
}

export const SignInButton = ({ className }: SignInButtonProps) => {
  return (
    <Link href="/auth/login" className={`${className}`}>
      <Button
        variant="outlined"
        className={`group rounded-full border-2 border-current flex items-center gap-2 lg:px-8 lg:py-3`}
      >
        Sign in
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={"h-5 w-5 group-hover:animate-spin"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </Link>
  );
};