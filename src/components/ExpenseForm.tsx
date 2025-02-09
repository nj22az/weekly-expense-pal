import React from 'react';
import { Trash2 } from 'lucide-react';
import { CURRENCIES } from '@/utils/currencyUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpenseFormProps {
  expense: {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: string;
    currency: string;
    notes: string;
  };
  baseCurrency: string;
  onRemove: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
  convertedAmount?: number;
}

const ExpenseForm = ({ expense, baseCurrency, onRemove, onChange, convertedAmount }: ExpenseFormProps) => {
  return (
    <motion.div
      data-expense-id={expense.id}
      className="group relative overflow-visible rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="space-y-6">
        <input
          type="text"
          value={expense.description}
          onChange={(e) => onChange(expense.id, 'description', e.target.value)}
          className="w-full px-4 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-medium placeholder:text-gray-400"
          placeholder="Description"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={expense.date}
            onChange={(e) => onChange(expense.id, 'date', e.target.value)}
            className="w-full px-4 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          />
          
          <select
            value={expense.category}
            onChange={(e) => onChange(expense.id, 'category', e.target.value)}
            className="w-full px-4 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          >
            <option value="">Category</option>
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

        <div className="flex gap-2">
          <select
            value={expense.currency}
            onChange={(e) => onChange(expense.id, 'currency', e.target.value)}
            className="w-24 px-2 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          >
            {Object.keys(CURRENCIES).map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => onChange(expense.id, 'amount', e.target.value)}
            className="flex-1 px-4 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            step="0.01"
            min="0"
            placeholder="0.00"
          />
        </div>

        {expense.amount && expense.currency !== baseCurrency && (
          <p className="text-sm text-gray-500">
            ≈ {CURRENCIES[baseCurrency].symbol}
            {convertedAmount?.toFixed(2)} {baseCurrency}
          </p>
        )}

        <input
          type="text"
          value={expense.notes}
          onChange={(e) => onChange(expense.id, 'notes', e.target.value)}
          className="w-full px-4 py-3 text-base bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          placeholder="Notes"
        />
      </div>

      <button
        onClick={() => {
          if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
          }
          onRemove(expense.id);
        }}
        className="absolute -right-2 -top-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 transform hover:scale-110"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default ExpenseForm;
