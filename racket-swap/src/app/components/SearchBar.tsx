import React, { useState } from 'react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const placeholder = "Search for brand, model, etc.";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-xl h-full min-w-[200px] lg:pl-4 lg:pr-8">
      <div className="relative flex items-center w-full h-full text-gray-100 border-2 border-gray-500 rounded-xl transition duration-300 ease focus-within:border-gray-300 hover:border-gray-400">
        <svg
          className="absolute left-3 w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          placeholder={placeholder}
          className="w-full h-12 bg-transparent placeholder:text-slate-400 text-gray-100 pl-10 pr-28 rounded-xl shadow-xs"
        />
      </div>
    </div>
  );
};

export default SearchBar;