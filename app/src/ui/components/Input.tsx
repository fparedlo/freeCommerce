import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        {...props}
        className={`mt-1.5 text-lg py-3 px-4 block w-full border-2 rounded-md transition-colors
          ${error ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-blue-500"}
          ${props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${error ? "focus:ring-red-200" : "focus:ring-blue-200"}
          ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </label>
  );
};
