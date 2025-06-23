"use client";

import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 m-auto">
      <div className="relative size-9">
        <Image
          src='/icon-empty.png'
          alt='RacketSwap Logo'
          fill
        />
      </div>
      <span className="text-3xl font-black">RACKETSWAP</span>
    </div>
  );
};