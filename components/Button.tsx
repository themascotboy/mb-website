import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-semibold uppercase tracking-widest py-4 px-10 transition-all duration-300 text-xs md:text-sm rounded-full inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-mascot-yellow text-mascot-black hover:bg-mascot-warm hover:scale-[1.02] shadow-subtle hover:shadow-elevated",
    secondary: "bg-mascot-black text-white hover:bg-black/90 hover:scale-[1.02] shadow-subtle hover:shadow-elevated",
    outline: "bg-transparent text-mascot-black border border-gray-200 hover:border-mascot-black hover:bg-mascot-gray"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};