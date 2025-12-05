import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = '0ms' }) => {
  return (
    <div 
      className={`bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl rounded-[2rem] p-6 transition-all duration-500 ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};
