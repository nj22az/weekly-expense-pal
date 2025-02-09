import React, { useEffect, useState } from 'react';
import NavHeader from '@/components/NavHeader';
import Footer from '@/components/Footer';

const ExpenseTracker: React.FC = () => {
  // Defaulting base currency to SEK
  const [baseCurrency, setBaseCurrency] = useState('SEK');
  const [exchangeRates, setExchangeRates] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExchangeRates = async () => {
      setIsLoading(true);
      const rates = await fetchExchangeRates(baseCurrency);
      setExchangeRates(rates);
      setIsLoading(false);
    };

    // Initial load
    loadExchangeRates();

    // Update automatically every 5 minutes
    const interval = setInterval(loadExchangeRates, 300000);
    return () => clearInterval(interval);
  }, [baseCurrency]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <NavHeader />
      <main className="flex-1 pt-20 pb-20 px-4">
        <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6">
          {/* Insert your ExpenseHeader, expense list, forms, etc. here */}
        </Card>
      </main>
      <Footer onAdd={() => {/* add expense handler */}} onExport={() => {/* export CSV handler */}} />
    </div>
  );
};

export default ExpenseTracker; 