import React from 'react';

export type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ children, title, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
