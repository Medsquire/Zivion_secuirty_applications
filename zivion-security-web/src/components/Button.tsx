import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "w-full h-[40px] px-6 rounded-xl font-semibold text-[14px] transition-all flex items-center justify-center active:scale-95";
  
  const variants = {
    primary: "btn-glass-primary text-white hover:opacity-95",
    secondary: "bg-gradient-secondary text-white shadow-soft hover:opacity-95 rounded-xl",
    outline: "glass-input text-electric hover:bg-white/80"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
