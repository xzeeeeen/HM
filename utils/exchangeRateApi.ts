export interface ExchangeRates {
  [key: string]: number;
}

// More realistic, up-to-date mock rates based on USD
const LATEST_RATES: ExchangeRates = {
  'USD': 1.0,
  'EUR': 1.0853,
  'GBP': 1.2718,
  'JPY': 0.0063,
  'CHF': 1.1161,
  'CAD': 0.7305,
  'AUD': 0.6654,
};

/**
 * Simulates fetching real-time exchange rates from an API.
 * @returns A promise that resolves with the latest exchange rates.
 */
export const fetchRates = (): Promise<ExchangeRates> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay of 500ms to 1200ms
    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      // Simulate a 5% chance of API failure for demonstration
      if (Math.random() < 0.05) {
        reject(new Error('Network error: Could not fetch exchange rates.'));
      } else {
        resolve(LATEST_RATES);
      }
    }, delay);
  });
};
