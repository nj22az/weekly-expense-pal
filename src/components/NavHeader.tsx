import React from 'react';

const NavHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <img 
              src="/weekly-expense-pal/assets/images/a.jpeg" 
              alt="Office Logo" 
              className="w-12 h-12 rounded-2xl object-cover shadow-sm transform transition-transform hover:scale-105"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10"></div>
          </div>
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            From the Office of
          </span>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Nils Johansson
          </span>
        </div>
      </div>
    </header>
  );
};

export default NavHeader; 