import { ReactNode } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {children}
      <div className="flex-1 flex justify-center items-center bg-[#f9f0e7]">
        <div className="relative w-1/2 aspect-square">
          <Image
            src="/login-image.png"
            fill={true}
            alt="Login Image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}