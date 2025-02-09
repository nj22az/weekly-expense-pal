
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  INR: { symbol: '₹', name: 'Indian Rupee' }
};

export const MOCK_EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  AUD: 1.35,
  CAD: 1.25,
  CNY: 6.45,
  INR: 73.5
};

export const convertToBaseCurrency = (amount: number, fromCurrency: string, baseCurrency: string): number => {
  if (!amount) return 0;
  const fromRate = MOCK_EXCHANGE_RATES[fromCurrency];
  const toRate = MOCK_EXCHANGE_RATES[baseCurrency];
  return (amount / fromRate) * toRate;
};
