import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 h-12 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
          &copy; {currentYear} All rights reserved Nils Johansson
        </p>
      </div>
    </footer>
  );
};

export default Footer; 