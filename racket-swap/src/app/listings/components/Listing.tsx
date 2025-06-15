interface ListingProps {
  image: string;
  title: string;
  cost: string;
  lister: string;
  description?: string;
}

export const Listing: React.FC<ListingProps> = ({ image, title, cost, lister, description }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{cost}</p>
      </div>
    </div>
  );
};
