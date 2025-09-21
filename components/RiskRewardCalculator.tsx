import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

interface RiskRewardCalculatorProps {
    t: any; // Translation object
}

export const RiskRewardCalculator: React.FC<RiskRewardCalculatorProps> = ({ t }) => {
    const [entryPrice, setEntryPrice] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [takeProfit, setTakeProfit] = useState('');
    const [result, setResult] = useState<{ risk: number; reward: number; ratio: string } | string | null>(null);

    const calculateRatio = () => {
        const entry = parseFloat(entryPrice);
        const sl = parseFloat(stopLoss);
        const tp = parseFloat(takeProfit);

        if (isNaN(entry) || isNaN(sl) || isNaN(tp)) {
            setResult(t.errors.enterValidPrices);
            return;
        }

        const risk = Math.abs(entry - sl);
        const reward = Math.abs(tp - entry);

        if (risk <= 0) {
            setResult(t.errors.riskGreaterThanZero);
            return;
        }

        const ratio = reward / risk;

        setResult({
            risk,
            reward,
            ratio: ratio.toFixed(2),
        });
    };

    const resultDisplay = useMemo(() => {
        if (result === null) return null;
        const isError = typeof result === 'string';

        if (isError) {
            return (
                <div className="mt-6 p-4 rounded-lg text-center bg-brand-red/10 border border-brand-red/30 text-brand-red">
                    <p className="text-lg">{result}</p>
                </div>
            );
        }

        const rewardPercentage = (parseFloat(result.ratio) / (1 + parseFloat(result.ratio))) * 100;
        const riskPercentage = 100 - rewardPercentage;

        return (
            <div className="mt-6 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-brand-border">
                <h3 className="text-xl font-semibold text-center mb-4">{t.results.rrRatio}</h3>
                <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-brand-accent" style={{textShadow: '0 0 15px rgba(0,255,255,0.5)'}}>1 : {result.ratio}</span>
                </div>
                <div className="w-full bg-brand-primary rounded-full h-8 flex overflow-hidden border border-brand-border">
                    <div
                        className="bg-brand-red flex items-center justify-center text-white font-bold"
                        style={{ width: `${riskPercentage}%`, boxShadow: `0 0 15px var(--tw-shadow-color)`, '--tw-shadow-color': 'rgba(244, 63, 94, 0.5)' } as React.CSSProperties}
                    >
                       {t.results.risk}
                    </div>
                    <div
                        className="bg-brand-green flex items-center justify-center text-white font-bold"
                        style={{ width: `${rewardPercentage}%`, boxShadow: `0 0 15px var(--tw-shadow-color)`, '--tw-shadow-color': 'rgba(74, 222, 128, 0.5)' } as React.CSSProperties}
                    >
                       {t.results.reward}
                    </div>
                </div>
                <div className="flex justify-between mt-4 text-brand-text-secondary">
                    <div>
                        <p className="font-semibold text-white">{t.results.risk}</p>
                        <p>{result.risk.toFixed(5)} (pips/points)</p>
                    </div>
                     <div className="text-right">
                        <p className="font-semibold text-white">{t.results.reward}</p>
                        <p>{result.reward.toFixed(5)} (pips/points)</p>
                    </div>
                </div>
            </div>
        );
    }, [result, t]);

    return (
        <Card title={t.tools.risk.title} description={t.tools.risk.description}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    label={t.labels.entryPrice}
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    placeholder="e.g., 1.07500"
                />
                <Input
                    label={t.labels.stopLossPrice}
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="e.g., 1.07300"
                />
                <Input
                    label={t.labels.takeProfitPrice}
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    placeholder="e.g., 1.08000"
                />
            </div>
            <div className="mt-6">
                <Button onClick={calculateRatio}>{t.buttons.calculate}</Button>
            </div>
            {resultDisplay}
        </Card>
    );
};