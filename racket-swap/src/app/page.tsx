import Image from "next/image";
import { NavbarDefault } from "./components/NavbarDefault"

export default function Home() {
  return (
    <>
      <NavbarDefault />

      <div className="relative justify-center items-center h-128">
        <Image
          src="/badminton-racket.webp"
          fill={true}
          alt="Home Image"
          className="object-contain"
        />
      </div>
    </>
  );
}
