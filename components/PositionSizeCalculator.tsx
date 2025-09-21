import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { CURRENCY_PAIRS, ACCOUNT_CURRENCIES } from '../constants';
import { fetchRates } from '../utils/exchangeRateApi';

interface PositionSizeCalculatorProps {
    t: any; // Translation object
}

export const PositionSizeCalculator: React.FC<PositionSizeCalculatorProps> = ({ t }) => {
    const [accountBalance, setAccountBalance] = useState('10000');
    const [riskPercentage, setRiskPercentage] = useState('1');
    const [stopLossPips, setStopLossPips] = useState('20');
    const [currencyPair, setCurrencyPair] = useState(CURRENCY_PAIRS[0]);
    const [accountCurrency, setAccountCurrency] = useState(ACCOUNT_CURRENCIES[0]);
    const [result, setResult] = useState<{ size: string; risk: string } | string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const calculatePositionSize = async () => {
        setIsLoading(true);
        setResult(null);

        const balance = parseFloat(accountBalance);
        const risk = parseFloat(riskPercentage);
        const slPips = parseFloat(stopLossPips);

        if (isNaN(balance) || isNaN(risk) || isNaN(slPips) || balance <= 0 || risk <= 0 || slPips <= 0) {
            setResult(t.errors.invalidNumbers);
            setIsLoading(false);
            return;
        }

        try {
            const rates = await fetchRates();
            const riskAmount = balance * (risk / 100);

            const [base, quote] = currencyPair.split('/');
            const isJpyPair = quote === 'JPY' || base === 'JPY';
            const pipDecimal = isJpyPair ? 0.01 : 0.0001;
            
            if (!rates[quote] || !rates[accountCurrency]) {
                throw new Error(`Exchange rate for ${quote} or ${accountCurrency} not available.`);
            }
            
            const quoteToAccountRate = rates[quote] / rates[accountCurrency];
            const pipValuePerUnitInAccountCurrency = pipDecimal * quoteToAccountRate;

            const stopLossValueInAccountCurrency = slPips * pipValuePerUnitInAccountCurrency;
            if (stopLossValueInAccountCurrency <= 0) {
                throw new Error(t.errors.checkInputs);
            }
            const positionSizeInUnits = riskAmount / stopLossValueInAccountCurrency;
            
            const positionSizeInLots = positionSizeInUnits / 100000;

            setResult({
                size: positionSizeInLots.toFixed(2),
                risk: riskAmount.toFixed(2),
            });

        } catch (e: any) {
            setResult(e.message || t.errors.fetchFailed);
        } finally {
            setIsLoading(false);
        }
    };

    const resultDisplay = useMemo(() => {
        if (result === null) return null;
        const isError = typeof result === 'string';

        return (
             <div className={`mt-6 p-4 rounded-lg text-center ${isError ? 'bg-brand-red/10 border border-brand-red/30' : 'bg-brand-accent/10 border border-brand-accent/30'}`}>
                {isError ? (
                     <p className="text-lg text-brand-red">{result}</p>
                ) : (
                    <>
                        <p className="text-lg text-brand-text-secondary">{t.results.recommendedSize}:</p>
                        <p className="text-4xl font-bold text-brand-accent mt-1" style={{textShadow: '0 0 15px rgba(0,255,255,0.5)'}}>{result.size} {t.results.lots}</p>
                        <p className="text-md text-brand-text-secondary mt-2">
                           ({t.results.risking} {result.risk} {accountCurrency})
                        </p>
                    </>
                )}
            </div>
        );
    }, [result, accountCurrency, t]);

    return (
        <Card title={t.tools.position.title} description={t.tools.position.description}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label={t.labels.accountCurrency}
                    value={accountCurrency}
                    onChange={(e) => setAccountCurrency(e.target.value)}
                    options={ACCOUNT_CURRENCIES}
                />
                <Select
                    label={t.labels.currencyPair}
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    options={CURRENCY_PAIRS}
                />
                <Input
                    label={t.labels.accountBalance}
                    type="number"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    placeholder="e.g., 10000"
                />
                <Input
                    label={t.labels.riskPercentage}
                    type="number"
                    value={riskPercentage}
                    onChange={(e) => setRiskPercentage(e.target.value)}
                    placeholder="e.g., 1 or 2"
                />
                <Input
                    label={t.labels.stopLossPips}
                    type="number"
                    value={stopLossPips}
                    onChange={(e) => setStopLossPips(e.target.value)}
                    placeholder="e.g., 20"
                />
            </div>
            <div className="mt-6">
                <Button onClick={calculatePositionSize} disabled={isLoading}>
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