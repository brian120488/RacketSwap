"use client";

import React from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={`group relative w-full ${className}`}>
      <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border-b border-gray-400 focus:border-blue-400 outline-none py-1 text-gray-800 text-sm"
      />
      <div className="mt-1 text-xs text-gray-400 group-focus-within:text-blue-400">
        {type.toUpperCase()}
      </div>
    </div>
  );
};

export default Input;