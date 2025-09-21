import React, { useState } from 'react';
import { PipCalculator } from '../PipCalculator';
import { PositionSizeCalculator } from '../PositionSizeCalculator';
import { RiskRewardCalculator } from '../RiskRewardCalculator';
import { ProfitMarginCalculator } from '../ProfitMarginCalculator';
import { BreakEvenCalculator } from '../BreakEvenCalculator';
import { CompoundInterestCalculator } from '../CompoundInterestCalculator';
import { CalculatorIcon } from '../icons/CalculatorIcon';

const translations = {
    id: {
        pageTitle: 'Alat Trading & Bisnis',
        pageDescription: 'Gunakan kalkulator kami untuk membantu perencanaan dan analisis Anda.',
        categories: {
            trading: 'Alat Trading',
            business: 'Alat Bisnis',
        },
        tools: {
            pip: { name: 'Nilai Pip', title: 'Kalkulator Nilai Pip', description: 'Hitung nilai satu pip untuk pasangan mata uang apa pun menggunakan data real-time.' },
            position: { name: 'Ukuran Posisi', title: 'Kalkulator Ukuran Posisi', description: 'Tentukan ukuran posisi yang sesuai berdasarkan saldo akun, toleransi risiko, dan stop loss Anda.' },
            risk: { name: 'Risk/Reward', title: 'Kalkulator Risk/Reward', description: 'Hitung dan visualisasikan rasio risiko terhadap imbalan untuk pengaturan perdagangan Anda.' },
            margin: { name: 'Margin Profit', title: 'Kalkulator Margin Profit', description: 'Hitung margin keuntungan dari penjualan, produk, atau bisnis.' },
            breakeven: { name: 'Titik Impas', title: 'Kalkulator Titik Impas', description: 'Tentukan berapa banyak unit yang perlu Anda jual untuk menutupi semua biaya Anda.' },
            compound: { name: 'Bunga Majemuk', title: 'Kalkulator Bunga Majemuk', description: 'Proyeksikan pertumbuhan investasi masa depan Anda dengan bunga majemuk.' },
        },
        labels: {
            currencyPair: 'Pasangan Mata Uang',
            accountCurrency: 'Mata Uang Akun',
            positionSize: 'Ukuran Posisi (Unit)',
            accountBalance: 'Saldo Akun',
            riskPercentage: 'Persentase Risiko (%)',
            stopLossPips: 'Stop Loss (pips)',
            entryPrice: 'Harga Masuk',
            stopLossPrice: 'Harga Stop Loss',
            takeProfitPrice: 'Harga Take Profit',
            totalRevenue: 'Total Pendapatan',
            totalCost: 'Total Biaya (HPP)',
            totalFixedCosts: 'Total Biaya Tetap',
            variableCostPerUnit: 'Biaya Variabel Per Unit',
            salePricePerUnit: 'Harga Jual Per Unit',
            initialInvestment: 'Investasi Awal',
            monthlyContribution: 'Kontribusi Bulanan',
            annualRate: 'Suku Bunga Tahunan (%)',
            yearsToGrow: 'Lama Investasi (Tahun)',
            compoundFrequency: 'Frekuensi Bunga Majemuk',
        },
        buttons: {
            calculate: 'Hitung',
        },
        results: {
            pipValueIs: 'Satu pip bernilai',
            recommendedSize: 'Ukuran Posisi yang Direkomendasikan',
            risking: 'Meresikokan',
            lots: 'Lots',
            rrRatio: 'Rasio Risk / Reward',
            risk: 'Risiko',
            reward: 'Imbalan',
            profitMargin: 'Margin Keuntungan',
            youNeedToSell: 'Anda perlu menjual',
            units: 'Unit',
            toBreakEven: 'untuk mencapai titik impas.',
            futureValue: 'Nilai Masa Depan',
            totalContribution: 'Total Kontribusi',
            totalInterest: 'Total Bunga',
        },
        errors: {
            invalidPositionSize: 'Ukuran posisi tidak valid',
            fetchFailed: 'Terjadi kesalahan tak terduga saat menghitung.',
            invalidNumbers: 'Harap masukkan angka positif yang valid untuk semua bidang.',
            checkInputs: 'Nilai stop loss yang dihitung nol atau negatif. Periksa input.',
            enterValidPrices: 'Harap masukkan angka yang valid untuk semua harga.',
            riskGreaterThanZero: 'Risiko harus lebih besar dari nol. Harga Masuk dan Stop Loss tidak boleh sama.',
            invalidRevenueCost: 'Harap masukkan angka yang valid untuk pendapatan dan biaya.',
            revenuePositive: 'Pendapatan harus berupa angka positif.',
            costGreaterThanRevenue: 'Biaya tidak boleh lebih besar dari pendapatan.',
            priceGreaterThanVariable: 'Harga per unit harus lebih besar dari biaya variabel per unit.',
        }
    },
    en: {
        pageTitle: 'Trading & Business Tools',
        pageDescription: 'Use our calculators to aid in your planning and analysis.',
        categories: {
            trading: 'Trading Tools',
            business: 'Business Tools',
        },
        tools: {
            pip: { name: 'Pip Value', title: 'Pip Value Calculator', description: 'Calculate the value of a single pip for any currency pair using real-time data.' },
            position: { name: 'Position Size', title: 'Position Size Calculator', description: 'Determine the appropriate position size based on your account balance, risk tolerance, and stop loss.' },
            risk: { name: 'Risk/Reward', title: 'Risk/Reward Calculator', description: 'Calculate and visualize the risk-to-reward ratio for your trade setup.' },
            margin: { name: 'Profit Margin', title: 'Profit Margin Calculator', description: 'Calculate the profit margin of a sale, product, or business.' },
            breakeven: { name: 'Break-Even', title: 'Break-Even Point Calculator', description: 'Determine how many units you need to sell to cover your costs.' },
            compound: { name: 'Compound Interest', title: 'Compound Interest Calculator', description: 'Project the future growth of your investments with compounding.' },
        },
        labels: {
            currencyPair: 'Currency Pair',
            accountCurrency: 'Account Currency',
            positionSize: 'Position Size (Units)',
            accountBalance: 'Account Balance',
            riskPercentage: 'Risk Percentage (%)',
            stopLossPips: 'Stop Loss (pips)',
            entryPrice: 'Entry Price',
            stopLossPrice: 'Stop Loss Price',
            takeProfitPrice: 'Take Profit Price',
            totalRevenue: 'Total Revenue',
            totalCost: 'Total Cost (COGS)',
            totalFixedCosts: 'Total Fixed Costs',
            variableCostPerUnit: 'Variable Cost Per Unit',
            salePricePerUnit: 'Sale Price Per Unit',
            initialInvestment: 'Initial Investment',
            monthlyContribution: 'Monthly Contribution',
            annualRate: 'Estimated Annual Interest Rate (%)',
            yearsToGrow: 'Years to Grow',
            compoundFrequency: 'Compound Frequency',
        },
        buttons: {
            calculate: 'Calculate',
        },
        results: {
            pipValueIs: 'One pip is worth',
            recommendedSize: 'Recommended Position Size',
            risking: 'Risking',
            lots: 'Lots',
            rrRatio: 'Risk / Reward Ratio',
            risk: 'Risk',
            reward: 'Reward',
            profitMargin: 'Profit Margin',
            youNeedToSell: 'You need to sell',
            units: 'Units',
            toBreakEven: 'to break even.',
            futureValue: 'Future Value',
            totalContribution: 'Total Contribution',
            totalInterest: 'Total Interest',
        },
        errors: {
            invalidPositionSize: 'Invalid position size',
            fetchFailed: 'An unexpected error occurred while calculating.',
            invalidNumbers: 'Please enter valid positive numbers for all fields.',
            checkInputs: 'Calculated stop loss value is zero or negative. Check inputs.',
            enterValidPrices: 'Please enter valid numbers for all prices.',
            riskGreaterThanZero: 'Risk must be greater than zero. Entry and Stop Loss cannot be the same.',
            invalidRevenueCost: 'Please enter valid numbers for revenue and cost.',
            revenuePositive: 'Revenue must be a positive number.',
            costGreaterThanRevenue: 'Cost cannot be greater than revenue.',
            priceGreaterThanVariable: 'Price per unit must be greater than the variable cost per unit.',
        }
    }
};


type ToolId = 'pip' | 'position' | 'risk' | 'margin' | 'breakeven' | 'compound';
type Language = 'id' | 'en';
type Currency = 'USD' | 'IDR';

const tradingTools: ToolId[] = ['pip', 'position', 'risk'];
const businessTools: ToolId[] = ['margin', 'breakeven', 'compound'];

export const ToolsView: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ToolId>('pip');
    const [language, setLanguage] = useState<Language>('id');
    const [currency, setCurrency] = useState<Currency>('USD');
    
    const t = translations[language];

    const renderActiveTool = () => {
        const props = { t, currency };
        switch (activeTool) {
            case 'pip': return <PipCalculator {...props} />;
            case 'position': return <PositionSizeCalculator {...props} />;
            case 'risk': return <RiskRewardCalculator {...props} />;
            case 'margin': return <ProfitMarginCalculator {...props} />;
            case 'breakeven': return <BreakEvenCalculator {...props} />;
            case 'compound': return <CompoundInterestCalculator {...props} />;
            default: return null;
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t.pageTitle}</h1>
                    <p className="mt-1 text-md text-brand-text-secondary">{t.pageDescription}</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    {/* Language Switcher */}
                    <div className="flex items-center bg-brand-secondary/50 border border-brand-border rounded-lg p-1">
                        <button onClick={() => setLanguage('id')} className={`px-3 py-1 text-sm rounded ${language === 'id' ? 'bg-brand-accent text-brand-primary' : 'text-brand-text-secondary'}`}>ID</button>
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded ${language === 'en' ? 'bg-brand-accent text-brand-primary' : 'text-brand-text-secondary'}`}>EN</button>
                    </div>
                     {/* Currency Switcher */}
                    <div className="flex items-center bg-brand-secondary/50 border border-brand-border rounded-lg p-1">
                        <button onClick={() => setCurrency('USD')} className={`px-3 py-1 text-sm rounded ${currency === 'USD' ? 'bg-brand-accent text-brand-primary' : 'text-brand-text-secondary'}`}>USD</button>
                        <button onClick={() => setCurrency('IDR')} className={`px-3 py-1 text-sm rounded ${currency === 'IDR' ? 'bg-brand-accent text-brand-primary' : 'text-brand-text-secondary'}`}>IDR</button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {/* Trading Tools Category */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">{t.categories.trading}</h2>
                    <div className="flex flex-wrap gap-3">
                        {tradingTools.map(toolId => (
                             <button
                                key={toolId}
                                onClick={() => setActiveTool(toolId)}
                                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-lg border-2 ${activeTool === toolId ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'border-brand-border bg-brand-secondary/30 hover:bg-brand-secondary/80'}`}
                            >
                                {t.tools[toolId].name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Business Tools Category */}
                 <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">{t.categories.business}</h2>
                    <div className="flex flex-wrap gap-3">
                        {businessTools.map(toolId => (
                             <button
                                key={toolId}
                                onClick={() => setActiveTool(toolId)}
                                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-lg border-2 ${activeTool === toolId ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'border-brand-border bg-brand-secondary/30 hover:bg-brand-secondary/80'}`}
                            >
                                {t.tools[toolId].name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 animate-fade-in-up">
                    {renderActiveTool()}
                </div>
            </div>
        </div>
    );
};