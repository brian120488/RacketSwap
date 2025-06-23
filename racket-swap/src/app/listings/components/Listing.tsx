import Image from "next/image";

export interface ListingProps {
  image: string;
  title: string;
  cost: number;
}

export const Listing: React.FC<ListingProps> = ({ image, title, cost }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="h-48 w-full relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="contain" // Ensures the image shrinks to fit within the container
          className="bg-gray-100" // Background for visual consistency
        />
      </div>

      {/* Details Section */}
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {/* <p className="mt-2 text-sm text-gray-600">{description}</p> */}
      </div>

      {/* Footer Section */}
      <div className="p-4 flex justify-between items-center border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">${cost.toFixed(2)}</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};
