"use client";

import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

interface LogOutButtonProps {
  className?: string;
}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
  const router = useRouter();

  const handleLogOut =  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        router.replace('/')
      } else {
        alert(data.error || 'Logout failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later. ' + error);
    }
  };

  return (
    <Button
      variant="outlined"
      className={`group rounded-full border-2 border-current flex items-center gap-2 lg:px-8 lg:py-3 ${className}`}
      onClick={handleLogOut}
      placeholder="Sign In"
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}>
      Log Out
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
  );
};