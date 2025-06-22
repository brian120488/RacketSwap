"use client";

import { useEffect, useState } from "react";
import { NavbarDefault } from "../components/NavbarDefault"
import { Listing } from "./components/Listing"

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listings");
        const data = await res.json();
        setListings(data.listings); 
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <NavbarDefault />
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* {listings.map((listing, index) => (
            <Listing
              key={index}
              image={listing.image}
              title={listing.title}
              cost={listing.cost}
              lister={listing.lister}
            />
          ))} */}
          {Array.from({ length: 10 }).map((_, index) => (
            <Listing
              key={index}
              image={listings[0]?.image || "https://via.placeholder.com/150"}
              title={listings[0]?.title || "Default Title"}
              cost={listings[0]?.cost || "Default Cost"}
            />
          ))}
        </div>
      </div>
    </>
  );
}

