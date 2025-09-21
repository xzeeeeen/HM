
export interface Asset {
  symbol: string;
  price: number;
  prevPrice: number;
  change: number;
  changePercent: number;
}

export type MarketData = {
    forex: Asset[];
    crypto: Asset[];
}

const initialForexData: Asset[] = [
  { symbol: "EUR/USD", price: 1.0855, prevPrice: 1.0855, change: 0.0000, changePercent: 0.00 },
  { symbol: "GBP/USD", price: 1.2718, prevPrice: 1.2718, change: 0.0000, changePercent: 0.00 },
  { symbol: "USD/JPY", price: 157.95, prevPrice: 157.95, change: 0.00, changePercent: 0.00 },
  { symbol: "AUD/USD", price: 0.6654, prevPrice: 0.6654, change: 0.0000, changePercent: 0.00 },
  { symbol: "USD/CAD", price: 1.3689, prevPrice: 1.3689, change: 0.0000, changePercent: 0.00 },
  { symbol: "USD/CHF", price: 0.8959, prevPrice: 0.8959, change: 0.0000, changePercent: 0.00 },
];

const initialCryptoData: Asset[] = [
    { symbol: "BTC/USD", price: 68450.75, prevPrice: 68450.75, change: 0.00, changePercent: 0.00 },
    { symbol: "ETH/USD", price: 3560.20, prevPrice: 3560.20, change: 0.00, changePercent: 0.00 },
    { symbol: "SOL/USD", price: 165.88, prevPrice: 165.88, change: 0.00, changePercent: 0.00 },
    { symbol: "XRP/USD", price: 0.4955, prevPrice: 0.4955, change: 0.0000, changePercent: 0.00 },
    { symbol: "DOGE/USD", price: 0.1583, prevPrice: 0.1583, change: 0.0000, changePercent: 0.00 },
    { symbol: "BNB/USD", price: 595.50, prevPrice: 595.50, change: 0.00, changePercent: 0.00 },
]

// Create a combined map for easy lookup of initial asset data
const allInitialData = new Map<string, Asset>([
    ...initialForexData.map(asset => [asset.symbol, asset] as [string, Asset]),
    ...initialCryptoData.map(asset => [asset.symbol, asset] as [string, Asset]),
]);


let marketData: MarketData = {
    // Deep copy to prevent mutation of initial data, ensuring "change" is calculated from the session's starting price
    forex: JSON.parse(JSON.stringify(initialForexData)),
    crypto: JSON.parse(JSON.stringify(initialCryptoData)),
};

// FIX: The return type of `setInterval` in a browser environment is `number`. 
// `NodeJS.Timeout` is for Node.js environments and causes a type error here.
let intervalId: number | null = null;
const subscribers: ((data: MarketData) => void)[] = [];

const updatePrices = () => {
  const updateAsset = (asset: Asset) => {
    const volatility = asset.symbol.includes("BTC") ? 0.001 : 0.0005;
    const changeFactor = (Math.random() - 0.5) * volatility;
    const newPrice = asset.price * (1 + changeFactor);
    
    const isJpyPair = asset.symbol.includes("JPY");
    const isCrypto = initialCryptoData.some(c => c.symbol === asset.symbol);
    
    let priceDecimals, changeDecimals;
    if (isJpyPair) {
        priceDecimals = 2;
        changeDecimals = 2;
    } else if (isCrypto && newPrice < 1) {
        priceDecimals = 4;
        changeDecimals = 4;
    } else if (isCrypto) {
        priceDecimals = 2;
        changeDecimals = 2;
    } else {
        priceDecimals = 4;
        changeDecimals = 4;
    }
    
    // Find the original starting price from the combined map
    const initialAssetData = allInitialData.get(asset.symbol);
    if (!initialAssetData) {
        console.error(`Initial data for ${asset.symbol} not found.`);
        return asset; // Return asset unchanged if no initial data
    }

    const prevPrice = asset.price;
    asset.price = parseFloat(newPrice.toFixed(priceDecimals));
    asset.prevPrice = prevPrice;
    asset.change = parseFloat((asset.price - initialAssetData.price).toFixed(changeDecimals));
    asset.changePercent = parseFloat(((asset.change / initialAssetData.price) * 100).toFixed(2));
    
    return asset;
  };

  marketData.forex = marketData.forex.map(updateAsset);
  marketData.crypto = marketData.crypto.map(updateAsset);
  
  subscribers.forEach(callback => callback({...marketData}));
};

const startFeed = () => {
  if (!intervalId) {
    intervalId = window.setInterval(updatePrices, 2000);
  }
};

const stopFeed = () => {
  if (intervalId && subscribers.length === 0) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

/**
 * Subscribes a component to the simulated market data feed.
 * @param callback The function to call with updated market data.
 * @returns An unsubscribe function to clean up the subscription.
 */
export const subscribeToMarketData = (callback: (data: MarketData) => void) => {
  subscribers.push(callback);
  startFeed();

  // Return an unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
    stopFeed();
  };
};
