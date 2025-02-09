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