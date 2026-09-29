import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "w-full py-3.5 px-6 rounded-full font-semibold text-[16px] transition-all flex items-center justify-center active:scale-95";
  
  const variants = {
    primary: "bg-gradient-primary text-white shadow-soft hover:opacity-90",
    secondary: "bg-gradient-secondary text-white shadow-soft hover:opacity-90",
    outline: "bg-transparent border border-electric text-electric hover:bg-electric/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
