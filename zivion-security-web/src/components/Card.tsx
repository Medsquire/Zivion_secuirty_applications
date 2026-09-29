import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-card rounded-[16px] border border-border shadow-soft p-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
