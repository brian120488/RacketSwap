"use client";

import { useEffect, useState } from "react";
import { NavbarDefault } from "../components/NavbarDefault"
import { Listing, ListingProps } from "./components/Listing"
import { Modal } from "./components/Modal"

export default function Listings() {
  const [listings, setListings] = useState<ListingProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListing, setNewListing] = useState<ListingProps>({
    image: "",
    title: "",
    cost: 0,
  });

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

  const handleAddListing = async (newListing: ListingProps) => {
    setListings((prevListings) => [...prevListings, newListing]);
    setIsModalOpen(false); 
    console.log("New listing added:", newListing);
    
    try {
      const res = await fetch("/api/listings", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListing)
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok) {
        alert("Added listing successfully");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Unable to add listing: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <NavbarDefault />

        <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Listing
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddListing}
        />

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

