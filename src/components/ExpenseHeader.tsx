
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
    <div className="space-y-2">
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
            {total.toFixed(2)}
          </Badge>
        </div>
      </div>
      <input
        type="text"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
        className="text-2xl font-bold bg-transparent border-none outline-none w-full transition-colors hover:text-gray-700 dark:hover:text-gray-300"
        placeholder="Enter Report Name"
      />
    </div>
  );
};

export default ExpenseHeader;
