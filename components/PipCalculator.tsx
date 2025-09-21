import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { CURRENCY_PAIRS, ACCOUNT_CURRENCIES } from '../constants';
import { fetchRates } from '../utils/exchangeRateApi';

interface PipCalculatorProps {
    t: any; // Translation object
}

export const PipCalculator: React.FC<PipCalculatorProps> = ({ t }) => {
    const [currencyPair, setCurrencyPair] = useState(CURRENCY_PAIRS[0]);
    const [accountCurrency, setAccountCurrency] = useState(ACCOUNT_CURRENCIES[0]);
    const [positionSize, setPositionSize] = useState('100000');
    const [pipValue, setPipValue] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calculatePipValue = async () => {
        setIsLoading(true);
        setError(null);
        setPipValue(null);

        const size = parseFloat(positionSize);
        if (isNaN(size) || size <= 0) {
            setError(t.errors.invalidPositionSize);
            setIsLoading(false);
            return;
        }

        try {
            const rates = await fetchRates();
            const [base, quote] = currencyPair.split('/');
            
            const isJpyPair = quote === 'JPY' || base === 'JPY';
            const pipSize = isJpyPair ? 0.01 : 0.0001;

            let valueOfOnePipInQuote: number;

            if(quote === accountCurrency){
                valueOfOnePipInQuote = pipSize * size;
            } else {
                if (!rates[quote] || !rates[accountCurrency]) {
                     throw new Error(`Exchange rate for ${quote} or ${accountCurrency} not available.`);
                }
                const quoteToAccountRate = rates[quote] / rates[accountCurrency];
                valueOfOnePipInQuote = (pipSize * size) * quoteToAccountRate;
            }
            
            setPipValue(valueOfOnePipInQuote.toFixed(4));
        } catch (e: any) {
            setError(e.message || t.errors.fetchFailed);
        } finally {
            setIsLoading(false);
        }
    };

    const resultDisplay = useMemo(() => {
        if (error) {
            return (
                <div className="mt-6 p-4 rounded-lg text-center bg-brand-red/10 border border-brand-red/30 text-brand-text-primary">
                    <p className="text-lg font-semibold text-brand-red">Calculation Failed</p>
                    <p>{error}</p>
                </div>
            );
        }

        if (pipValue === null) return null;

        return (
             <div className="mt-6 p-4 rounded-lg text-center bg-brand-green/10 border border-brand-green/30">
                <p className="text-lg text-brand-text-secondary">{t.results.pipValueIs}</p>
                <p className="text-3xl font-bold text-brand-green mt-1" style={{textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'}}>
                    {pipValue} {accountCurrency}
                </p>
            </div>
        )
    }, [pipValue, accountCurrency, error, t]);

  return (
    <Card title={t.tools.pip.title} description={t.tools.pip.description}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
                label={t.labels.currencyPair}
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                options={CURRENCY_PAIRS}
            />
            <Select
                label={t.labels.accountCurrency}
                value={accountCurrency}
                onChange={(e) => setAccountCurrency(e.target.value)}
                options={ACCOUNT_CURRENCIES}
            />
            <Input
                label={t.labels.positionSize}
                type="number"
                value={positionSize}
                onChange={(e) => setPositionSize(e.target.value)}
                placeholder="e.g., 100000"
            />
        </div>
        <div className="mt-6">
            <Button onClick={calculatePipValue} disabled={isLoading}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                    </div>
                ) : t.buttons.calculate}
            </Button>
        </div>
        {resultDisplay}
    </Card>
  );
};