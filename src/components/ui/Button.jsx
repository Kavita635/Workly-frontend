import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-white/10',
    secondary: 'bg-[#111111] text-white border border-[#1f1f1f] hover:border-[#333333] hover:bg-[#1a1a1a] focus:ring-[#333333]',
    outline: 'border border-[#333333] text-[#a1a1aa] hover:text-white hover:border-[#666666] focus:ring-[#666666]',
    ghost: 'text-[#a1a1aa] hover:text-white hover:bg-[#111111] focus:ring-[#111111] border border-transparent',
    danger: 'bg-red-900/20 text-red-500 border border-red-900/30 hover:bg-red-900/40 hover:border-red-900/60 focus:ring-red-900',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button 
      ref={ref}
      className={classes} 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
