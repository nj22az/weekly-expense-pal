
import React from 'react';
import { Trash2 } from 'lucide-react';
import { CURRENCIES } from '@/utils/currencyUtils';

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
    <div className="p-6 border dark:border-gray-700 rounded-lg relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => onRemove(expense.id)}
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
            onChange={(e) => onChange(expense.id, 'date', e.target.value)}
            className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Category</label>
          <select
            value={expense.category}
            onChange={(e) => onChange(expense.id, 'category', e.target.value)}
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
            onChange={(e) => onChange(expense.id, 'description', e.target.value)}
            className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
            placeholder="Enter expense description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Amount</label>
          <div className="flex gap-2">
            <select
              value={expense.currency}
              onChange={(e) => onChange(expense.id, 'currency', e.target.value)}
              className="w-24 p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
            <input
              type="number"
              value={expense.amount}
              onChange={(e) => onChange(expense.id, 'amount', e.target.value)}
              className="flex-1 p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
              step="0.01"
              min="0"
            />
          </div>
          {expense.amount && expense.currency !== baseCurrency && (
            <p className="mt-1 text-sm text-gray-500">
              ≈ {CURRENCIES[baseCurrency].symbol}
              {convertedAmount?.toFixed(2)} {baseCurrency}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Notes</label>
          <input
            type="text"
            value={expense.notes}
            onChange={(e) => onChange(expense.id, 'notes', e.target.value)}
            className="w-full p-2.5 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
            placeholder="Additional notes"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
