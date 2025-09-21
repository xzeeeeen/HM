import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const MarketWatch: React.FC = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const container = widgetContainerRef.current;
        if (!container) return;

        // Clear any previous widget instance
        container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;

        const widgetConfig = {
            "colorTheme": theme,
            "dateRange": "12M",
            "showChart": true,
            "locale": "id",
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": true,
            "showFloatingTooltip": false,
            "width": "100%",
            "height": "660",
            "plotLineColorGrowing": "rgba(74, 222, 128, 1)",
            "plotLineColorFalling": "rgba(244, 63, 94, 1)",
            "gridLineColor": "rgba(44, 59, 88, 0.2)",
            "scaleFontColor": "rgba(148, 163, 184, 1)",
            "belowLineFillColorGrowing": "rgba(74, 222, 128, 0.12)",
            "belowLineFillColorFalling": "rgba(244, 63, 94, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "tabs": [
                {
                    "title": "Forex",
                    "symbols": [
                        { "s": "FX:EURUSD", "d": "EUR/USD" },
                        { "s": "FX:GBPUSD", "d": "GBP/USD" },
                        { "s": "FX:USDJPY", "d": "USD/JPY" },
                        { "s": "FX:AUDUSD", "d": "AUD/USD" },
                        { "s": "FX:USDCAD", "d": "USD/CAD" },
                        { "s": "FX:USDCHF", "d": "USD/CHF" }
                    ],
                    "originalTitle": "Forex"
                },
                {
                    "title": "Kripto",
                    "symbols": [
                        { "s": "BINANCE:BTCUSDT", "d": "Bitcoin" },
                        { "s": "BINANCE:ETHUSDT", "d": "Ethereum" },
                        { "s": "BINANCE:SOLUSDT", "d": "Solana" },
                        { "s": "BINANCE:XRPUSDT", "d": "Ripple" },
                        { "s": "BINANCE:DOGEUSDT", "d": "Dogecoin" },
                        { "s": "BINANCE:BNBUSDT", "d": "BNB" }
                    ],
                    "originalTitle": "Crypto"
                }
            ]
        };

        script.innerHTML = JSON.stringify(widgetConfig);
        container.appendChild(script);

    }, [theme]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Market Watch</h1>
                    <p className="mt-1 text-md text-brand-text-secondary flex items-center">
                        <span className="relative flex h-3 w-3 mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
                        </span>
                        Live market data, didukung oleh TradingView.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <div ref={widgetContainerRef} className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </div>
    );
};
