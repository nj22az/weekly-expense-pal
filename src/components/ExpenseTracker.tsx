
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Download, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseForm from './ExpenseForm';
import ExpenseHeader from './ExpenseHeader';
import { CURRENCIES, convertToBaseCurrency } from '@/utils/currencyUtils';

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

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return sum + convertToBaseCurrency(amount, expense.currency, baseCurrency);
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
      convertToBaseCurrency(parseFloat(expense.amount) || 0, expense.currency, baseCurrency).toFixed(2),
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
      <CardHeader>
        <ExpenseHeader
          reportName={reportName}
          setReportName={setReportName}
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
          total={calculateTotal()}
        />
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
              >
                <ExpenseForm
                  expense={expense}
                  baseCurrency={baseCurrency}
                  onRemove={removeExpense}
                  onChange={handleChange}
                  convertedAmount={convertToBaseCurrency(parseFloat(expense.amount) || 0, expense.currency, baseCurrency)}
                />
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
