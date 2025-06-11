import { NavbarDefault } from "../components/NavbarDefault"
import Listing from "./components/Listing";

export default function Listings() {
  const listings = [
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Tennis Racket",
      cost: "$120",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Badminton Racket",
      cost: "$80",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Tennis Racket",
      cost: "$120",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Badminton Racket",
      cost: "$80",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Tennis Racket",
      cost: "$120",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Badminton Racket",
      cost: "$80",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
    {
      imageSrc: "https://via.placeholder.com/150",
      title: "Squash Racket",
      cost: "$100",
    },
  ];

  return (
    <>
      <NavbarDefault />
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {listings.map((listing, index) => (
          <Listing
          key={index}
          imageSrc={listing.imageSrc}
          title={listing.title}
          cost={listing.cost}
          />
        ))}
        </div>
      </div>
    </>
  );
} 

