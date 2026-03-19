import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`px-3 py-2 bg-white border rounded-lg text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
