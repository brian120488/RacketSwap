"use client";

import React from "react";

interface InputProps {
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  isValid?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  isValid = true,
}) => {
  const borderColor = isValid ? "border-gray-400" : "border-red-400";
  const textColor = isValid ? "text-gray-400" : "text-red-400";

  return (
    <div className={`group relative w-full ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border-b ${borderColor} focus:border-blue-400 outline-none py-1 text-gray-800 text-sm`}
      />
      <div className={`mt-1 text-xs ${textColor} group-focus-within:text-blue-400`}>
        {type.toUpperCase()}
      </div>
    </div>
  );
};

export default Input;