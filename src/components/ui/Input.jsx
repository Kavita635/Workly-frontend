import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[#a1a1aa] ml-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none placeholder-[#475569] shadow-inner ${
          error ? 'border-red-900 focus:ring-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1 mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
