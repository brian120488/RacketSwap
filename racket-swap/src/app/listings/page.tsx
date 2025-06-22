"use client";

import { useEffect, useState } from "react";
import { NavbarDefault } from "../components/NavbarDefault"
import { Listing, ListingProps } from "./components/Listing"

export default function Listings() {
  const [listings, setListings] = useState<ListingProps[]>([]);

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
          {listings && listings.length > 0 ? (
            listings.map((listing, index) => (
              <Listing
                key={index}
                image={listing.image}
                title={listing.title}
                cost={listing.cost}
              />
            ))
          ) : (
            <p>No listings available.</p> // Show a fallback message if empty
          )}
        </div>
      </div>
    </>
  );
}

