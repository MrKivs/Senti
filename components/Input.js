import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  helper = "",
  icon = null,
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          {...props}
        />
      </div>
      {helper && !error && (
        <p id={`${id}-helper`} className="mt-1 text-xs text-gray-500">
          {helper}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs text-red-600"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
