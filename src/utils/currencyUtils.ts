
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  SEK: { symbol: 'kr', name: 'Swedish Krona' },
  DKK: { symbol: 'kr', name: 'Danish Krone' },
  NOK: { symbol: 'kr', name: 'Norwegian Krone' },
  VND: { symbol: '₫', name: 'Vietnamese Dong' }
};

export const MOCK_EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.41,
  AUD: 1.52,
  CAD: 1.35,
  CNY: 7.19,
  INR: 83.12,
  SEK: 10.42,
  DKK: 6.86,
  NOK: 10.51,
  VND: 24565
};

export const convertToBaseCurrency = (amount: number, fromCurrency: string, baseCurrency: string): number => {
  if (!amount) return 0;
  const fromRate = MOCK_EXCHANGE_RATES[fromCurrency];
  const toRate = MOCK_EXCHANGE_RATES[baseCurrency];
  return (amount / fromRate) * toRate;
};
