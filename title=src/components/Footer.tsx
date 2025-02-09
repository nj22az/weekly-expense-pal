const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-600 p-4 z-10 flex justify-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {currentYear} All rights reserved Nils Johansson
      </p>
    </footer>
  );
};

export default Footer; 