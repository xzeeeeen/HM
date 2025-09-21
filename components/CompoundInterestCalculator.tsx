import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';

interface CompoundInterestCalculatorProps {
    t: any;
    currency: 'USD' | 'IDR';
}

export const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ t, currency }) => {
    const [initial, setInitial] = useState('10000');
    const [contribution, setContribution] = useState('200');
    const [rate, setRate] = useState('7');
    const [years, setYears] = useState('10');
    const [frequency, setFrequency] = useState('12'); // Monthly
    const [result, setResult] = useState<{ futureValue: string; totalContribution: string; totalInterest: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculateCompound = () => {
        setError(null);
        setResult(null);

        const P = parseFloat(initial);
        const PMT = parseFloat(contribution);
        const r = parseFloat(rate) / 100;
        const t_years = parseFloat(years);
        const n = parseInt(frequency, 10);

        if (isNaN(P) || isNaN(PMT) || isNaN(r) || isNaN(t_years) || isNaN(n)) {
            setError(t.errors.invalidNumbers);
            return;
        }

        const principalCompound = P * Math.pow(1 + r / n, n * t_years);
        const futureValueOfSeries = PMT * ((Math.pow(1 + r / n, n * t_years) - 1) / (r / n));
        const total = principalCompound + futureValueOfSeries;
        
        const totalContributionValue = P + (PMT * t_years * (n === 12 ? 12 : 1)); // Simplified for monthly/yearly
        const totalInterestValue = total - totalContributionValue;
        
        const currencyFormatOptions: Intl.NumberFormatOptions = {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: currency === 'IDR' ? 0 : 2,
            maximumFractionDigits: currency === 'IDR' ? 0 : 2,
        };

        setResult({
            futureValue: total.toLocaleString(currency === 'IDR' ? 'id-ID' : 'en-US', currencyFormatOptions),
            totalContribution: totalContributionValue.toLocaleString(currency === 'IDR' ? 'id-ID' : 'en-US', currencyFormatOptions),
            totalInterest: totalInterestValue.toLocaleString(currency === 'IDR' ? 'id-ID' : 'en-US', currencyFormatOptions),
        });
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
                <p className="text-lg text-brand-text-secondary">{t.results.futureValue}</p>
                <p className="text-4xl font-bold text-brand-accent mt-1" style={{textShadow: '0 0 15px rgba(0,255,255,0.5)'}}>
                    {result.futureValue}
                </p>
                <div className="mt-4 flex flex-col md:flex-row justify-around text-brand-text-secondary space-y-2 md:space-y-0">
                    <div>
                        <p className="font-semibold text-white">{t.results.totalContribution}</p>
                        <p>{result.totalContribution}</p>
                    </div>
                     <div>
                        <p className="font-semibold text-white">{t.results.totalInterest}</p>
                        <p>{result.totalInterest}</p>
                    </div>
                </div>
            </div>
        );
    }, [result, error, t]);


  return (
    <Card title={t.tools.compound.title} description={t.tools.compound.description}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label={`${t.labels.initialInvestment} (${currency})`} type="number" value={initial} onChange={(e) => setInitial(e.target.value)} />
            <Input label={`${t.labels.monthlyContribution} (${currency})`} type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} />
            <Input label={t.labels.annualRate} type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
            <Input label={t.labels.yearsToGrow} type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            <Select label={t.labels.compoundFrequency} value={frequency} onChange={(e) => setFrequency(e.target.value)} options={['1', '4', '12']} />
            <div className="md:col-span-2 text-xs text-brand-text-secondary -mt-3">
                <p>Note: Options for compound frequency are 1 (Annually), 4 (Quarterly), 12 (Monthly).</p>
            </div>
        </div>
        <div className="mt-6">
            <Button onClick={calculateCompound}>{t.buttons.calculate}</Button>
        </div>
        {resultDisplay}
    </Card>
  );
};