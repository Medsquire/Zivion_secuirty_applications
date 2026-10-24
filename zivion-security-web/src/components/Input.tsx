import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-[13px] font-medium text-navy mb-1.5">{label}</label>
      <input 
        className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all placeholder:text-secondary/60"
        {...props}
      />
    </div>
  );
};
