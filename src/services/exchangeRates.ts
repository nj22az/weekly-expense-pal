const API_KEY = 'YOUR_API_KEY'; // Get from https://www.exchangerate-api.com/
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export interface ExchangeRates {
  [key: string]: number;
}

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRates> => {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    const data = await response.json();
    
    if (data.result === 'success') {
      return data.conversion_rates;
    }
    throw new Error('Failed to fetch exchange rates');
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    return {};
  }
}; 