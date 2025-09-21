import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

interface ProfitMarginCalculatorProps {
    t: any;
    currency: 'USD' | 'IDR';
}

export const ProfitMarginCalculator: React.FC<ProfitMarginCalculatorProps> = ({ t, currency }) => {
    const [revenue, setRevenue] = useState('');
    const [cost, setCost] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculateMargin = () => {
        setError(null);
        setResult(null);

        const rev = parseFloat(revenue);
        const cst = parseFloat(cost);

        if (isNaN(rev) || isNaN(cst)) {
            setError(t.errors.invalidRevenueCost);
            return;
        }

        if (rev <= 0) {
            setError(t.errors.revenuePositive);
            return;
        }

        if (cst > rev) {
            setError(t.errors.costGreaterThanRevenue);
            return;
        }
        
        const margin = ((rev - cst) / rev) * 100;
        setResult(margin.toFixed(2));
    };

    const resultDisplay = useMemo(() => {
        if (error) {
            return (
                <div className="mt-6 p-4 rounded-lg text-center bg-brand-red/10 border border-brand-red/30 text-brand-red">
                    <p>{error}</p>
                </div>
            );
        }

        if (result === null) return null;

        return (
             <div className="mt-6 p-4 rounded-lg text-center bg-brand-green/10 border border-brand-green/30">
                <p className="text-lg text-brand-text-secondary">{t.results.profitMargin}</p>
                <p className="text-4xl font-bold text-brand-green mt-1" style={{textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'}}>
                    {result}%
                </p>
            </div>
        );
    }, [result, error, t]);

  return (
    <Card title={t.tools.margin.title} description={t.tools.margin.description}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
                label={`${t.labels.totalRevenue} (${currency})`}
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="e.g., 1000"
            />
            <Input
                label={`${t.labels.totalCost} (${currency})`}
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="e.g., 600"
            />
        </div>
        <div className="mt-6">
            <Button onClick={calculateMargin}>{t.buttons.calculate}</Button>
        </div>
        {resultDisplay}
    </Card>
  );
};