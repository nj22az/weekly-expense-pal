import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CURRENCIES } from '@/utils/currencyUtils';

interface ExpenseHeaderProps {
  reportName: string;
  setReportName: (name: string) => void;
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  total: number;
}

const ExpenseHeader = ({ reportName, setReportName, baseCurrency, setBaseCurrency, total }: ExpenseHeaderProps) => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm font-normal">
          Weekly Overview
        </Badge>
        <div className="flex items-center gap-4">
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus:outline-none"
          >
            {Object.entries(CURRENCIES).map(([code, { name }]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
          <Badge variant="secondary" className="text-sm font-normal">
            Total: {CURRENCIES[baseCurrency].symbol}{total.toFixed(2)}
          </Badge>
        </div>
      </div>
      <input
        type="text"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
        className="text-2xl font-bold bg-transparent border-b-2 border-gray-300 dark:border-gray-600 w-full py-2 focus:outline-none"
        placeholder="Enter Report Name"
      />
    </div>
  );
};

export default ExpenseHeader; 