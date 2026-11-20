import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, active = false }) => {
  const baseGlass = active ? 'glass-stat-blue' : 'glass-stat-white';
  return (
    <div 
      className={`${baseGlass} p-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
