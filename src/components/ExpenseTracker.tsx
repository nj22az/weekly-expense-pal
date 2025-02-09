
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Plus, Trash2, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  INR: { symbol: '₹', name: 'Indian Rupee' }
};

// Mock exchange rates - in a production app, you'd fetch these from an API
const MOCK_EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  AUD: 1.35,
  CAD: 1.25,
  CNY: 6.45,
  INR: 73.5
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('concur-expenses');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      date: '',
      description: '',
      category: '',
      amount: '',
      currency: 'USD',
      notes: ''
    }];
  });

  const [baseCurrency, setBaseCurrency] = useState(() => {
    return localStorage.getItem('concur-base-currency') || 'USD';
  });

  const [reportName, setReportName] = useState(() => {
    return localStorage.getItem('concur-report-name') || 'Weekly Expense Report';
  });

  useEffect(() => {
    localStorage.setItem('concur-expenses', JSON.stringify(expenses));
    localStorage.setItem('concur-report-name', reportName);
    localStorage.setItem('concur-base-currency', baseCurrency);
  }, [expenses, reportName, baseCurrency]);

  const convertToBaseCurrency = (amount: number, fromCurrency: string) => {
    if (!amount) return 0;
    const fromRate = MOCK_EXCHANGE_RATES[fromCurrency];
    const toRate = MOCK_EXCHANGE_RATES[baseCurrency];
    return (amount / fromRate) * toRate;
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return sum + convertToBaseCurrency(amount, expense.currency);
    }, 0);
  };

  const addExpense = () => {
    const newExpense = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
      amount: '',
      currency: baseCurrency,
      notes: ''
    };
    setExpenses([...expenses, newExpense]);
    toast.success('New expense added');
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.info('Expense removed');
  };

  const handleChange = (id: number, field: string, value: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Currency', 'Amount in ' + baseCurrency, 'Notes'];
    const rows = expenses.map(expense => [
      expense.date,
      expense.category,
      expense.description,
      expense.amount,
      expense.currency,
      convertToBaseCurrency(parseFloat(expense.amount) || 0, expense.currency).toFixed(2),
      expense.notes
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Exported successfully');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm font-normal">
            Weekly Overview
          </Badge>
          <div className="flex items-center gap-4">
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="px-2 py-1 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50"
            >
              {Object.entries(CURRENCIES).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
            <Badge variant="secondary" className="text-sm font-normal">
              Total: {CURRENCIES[baseCurrency].symbol}
              {calculateTotal().toFixed(2)}
            </Badge>
          </div>
        </div>
        <CardTitle>
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none outline-none w-full transition-colors hover:text-gray-700 dark:hover:text-gray-300"
            placeholder="Enter Report Name"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 border dark:border-gray-700 rounded-lg relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => removeExpense(expense.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove expense"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Date</label>
                    <input
                      type="date"
                      value={expense.date}
                      onChange={(e) => handleChange(expense.id, 'date', e.target.value)}
                      className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Category</label>
                    <select
                      value={expense.category}
                      onChange={(e) => handleChange(expense.id, 'category', e.target.value)}
                      className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                    >
                      <option value="">Select category</option>
                      <option value="Airfare">Airfare</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Car Rental">Car Rental</option>
                      <option value="Taxi/Uber">Taxi/Uber</option>
                      <option value="Parking">Parking</option>
                      <option value="Meals">Meals</option>
                      <option value="Business Meals">Business Meals</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Phone/Internet">Phone/Internet</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Description</label>
                    <input
                      type="text"
                      value={expense.description}
                      onChange={(e) => handleChange(expense.id, 'description', e.target.value)}
                      className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                      placeholder="Enter expense description"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Amount</label>
                    <div className="flex gap-2">
                      <select
                        value={expense.currency}
                        onChange={(e) => handleChange(expense.id, 'currency', e.target.value)}
                        className="w-24 p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                      >
                        {Object.keys(CURRENCIES).map((code) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => handleChange(expense.id, 'amount', e.target.value)}
                        className="flex-1 p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    {expense.amount && expense.currency !== baseCurrency && (
                      <p className="mt-1 text-sm text-gray-500">
                        ≈ {CURRENCIES[baseCurrency].symbol}
                        {convertToBaseCurrency(parseFloat(expense.amount), expense.currency).toFixed(2)} {baseCurrency}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Notes</label>
                    <input
                      type="text"
                      value={expense.notes}
                      onChange={(e) => handleChange(expense.id, 'notes', e.target.value)}
                      className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addExpense}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportToCSV}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </motion.button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
