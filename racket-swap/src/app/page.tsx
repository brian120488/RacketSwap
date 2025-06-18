import Image from "next/image";
import { NavbarDefault } from "./components/NavbarDefault"
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('authToken');

  return (
    <>
      <NavbarDefault className="fixed" loggedIn={isLoggedIn} />
      <Image
        src="/home-image.jpg"
        alt="Hero Image"
        width={4160}
        height={6240}
        className="relative -z-1"></Image>
      <Image
        src="/100zz.jpeg"
        alt="Hero Image"
        width={4000}
        height={4000}
        className="relative m-auto rotate-180 -z-10 -mt-80 ml-2"></Image>
    </>
  );
}
