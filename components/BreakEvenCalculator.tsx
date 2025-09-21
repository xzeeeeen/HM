import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

interface BreakEvenCalculatorProps {
    t: any;
    currency: 'USD' | 'IDR';
}

export const BreakEvenCalculator: React.FC<BreakEvenCalculatorProps> = ({ t, currency }) => {
    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCost, setVariableCost] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculateBreakEven = () => {
        setError(null);
        setResult(null);

        const fc = parseFloat(fixedCosts);
        const vc = parseFloat(variableCost);
        const ppu = parseFloat(pricePerUnit);

        if (isNaN(fc) || isNaN(vc) || isNaN(ppu)) {
            setError(t.errors.invalidNumbers);
            return;
        }
        
        if (ppu <= vc) {
            setError(t.errors.priceGreaterThanVariable);
            return;
        }

        const breakEvenUnits = fc / (ppu - vc);
        setResult(Math.ceil(breakEvenUnits).toLocaleString());
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
             <div className="mt-6 p-4 rounded-lg text-center bg-brand-accent/10 border border-brand-accent/30">
                <p className="text-lg text-brand-text-secondary">{t.results.youNeedToSell}</p>
                <p className="text-4xl font-bold text-brand-accent mt-1" style={{textShadow: '0 0 15px rgba(0,255,255,0.5)'}}>
                    {result} {t.results.units}
                </p>
                 <p className="text-lg text-brand-text-secondary mt-1">{t.results.toBreakEven}</p>
            </div>
        );
    }, [result, error, t]);

  return (
    <Card title={t.tools.breakeven.title} description={t.tools.breakeven.description}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
                label={`${t.labels.totalFixedCosts} (${currency})`}
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
                placeholder="e.g., 5000"
            />
            <Input
                label={`${t.labels.variableCostPerUnit} (${currency})`}
                type="number"
                value={variableCost}
                onChange={(e) => setVariableCost(e.target.value)}
                placeholder="e.g., 20"
            />
             <Input
                label={`${t.labels.salePricePerUnit} (${currency})`}
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="e.g., 50"
            />
        </div>
        <div className="mt-6">
            <Button onClick={calculateBreakEven}>{t.buttons.calculate}</Button>
        </div>
        {resultDisplay}
    </Card>
  );
};