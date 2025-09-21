import React, { useState, useMemo } from 'react';
import { Card } from '../Card';
import { usePlatform } from '../../contexts/PlatformContext';
import { EconomicCalendarEvent } from '../../types';
import { Button } from '../Button';

const impactOrder = { High: 3, Medium: 2, Low: 1 };
const ALL_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

const ImpactBar: React.FC<{ impact: 'High' | 'Medium' | 'Low' }> = ({ impact }) => {
    const barClass = {
        High: 'bg-brand-red',
        Medium: 'bg-orange-500',
        Low: 'bg-yellow-500',
    };
    return (
        <div className="flex items-center space-x-1" title={`Impact: ${impact}`}>
            <div className={`w-2 h-3 rounded-sm ${barClass[impact]}`}></div>
            <div className={`w-2 h-3 rounded-sm ${impact !== 'Low' ? barClass[impact] : 'bg-brand-border'}`}></div>
            <div className={`w-2 h-3 rounded-sm ${impact === 'High' ? barClass[impact] : 'bg-brand-border'}`}></div>
        </div>
    );
};

const getActualColorClass = (actual: string | null, forecast: string) => {
    if (actual === null) return 'text-brand-text-secondary';
    
    // Simple numeric comparison, removing characters like '%' or 'K'
    const actualNum = parseFloat(actual.replace(/[^\d.-]/g, ''));
    const forecastNum = parseFloat(forecast.replace(/[^\d.-]/g, ''));

    if (isNaN(actualNum) || isNaN(forecastNum)) return 'text-white';

    if (actualNum > forecastNum) return 'text-brand-green';
    if (actualNum < forecastNum) return 'text-brand-red';
    return 'text-white';
};

export const CalendarView: React.FC = () => {
    const { economicEvents } = usePlatform();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [impactFilter, setImpactFilter] = useState<Array<'High' | 'Medium' | 'Low'>>(['High', 'Medium', 'Low']);
    const [currencyFilter, setCurrencyFilter] = useState<string[]>([]);

    const handleDateChange = (amount: number) => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + amount);
            return newDate;
        });
    };
    
    const handleImpactFilter = (impact: 'High' | 'Medium' | 'Low') => {
        setImpactFilter(prev => 
            prev.includes(impact) ? prev.filter(i => i !== impact) : [...prev, impact]
        );
    };

    const handleCurrencyFilter = (currency: string) => {
        setCurrencyFilter(prev => 
            prev.includes(currency) ? prev.filter(c => c !== currency) : [...prev, currency]
        );
    };

    const filteredEvents = useMemo(() => {
        const selectedDateStr = selectedDate.toISOString().split('T')[0];
        
        return economicEvents
            .filter(event => event.date === selectedDateStr)
            .filter(event => impactFilter.includes(event.impact))
            .filter(event => currencyFilter.length === 0 || currencyFilter.includes(event.currency))
            .sort((a, b) => {
                // Sort by time first
                const timeComparison = a.time.localeCompare(b.time);
                if (timeComparison !== 0) return timeComparison;
                // Then sort by impact
                return impactOrder[b.impact] - impactOrder[a.impact];
            });
    }, [economicEvents, selectedDate, impactFilter, currencyFilter]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Kalender Ekonomi</h1>
            <p className="mt-1 text-md text-brand-text-secondary">
                Pantau event finansial penting yang dapat memengaruhi pasar.
            </p>

            <div className="mt-8">
                <Card title="Jadwal Berita" description="Gunakan filter untuk fokus pada event yang paling penting bagi Anda.">
                    {/* Header Controls */}
                    <div className="p-4 bg-brand-primary/50 rounded-lg border border-brand-border space-y-4">
                        {/* Date Navigation */}
                        <div className="flex items-center justify-between">
                            <Button onClick={() => handleDateChange(-1)} variant="secondary" className="!w-auto px-4 !py-2">&larr; Prev</Button>
                            <h3 className="text-xl font-semibold text-white text-center">
                                {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h3>
                            <Button onClick={() => handleDateChange(1)} variant="secondary" className="!w-auto px-4 !py-2">Next &rarr;</Button>
                        </div>
                        {/* Filter Controls */}
                        <div>
                            <div className="text-sm font-semibold text-brand-text-secondary mb-2">Filter by Impact:</div>
                            <div className="flex flex-wrap gap-2">
                                {(['High', 'Medium', 'Low'] as const).map(impact => (
                                    <button key={impact} onClick={() => handleImpactFilter(impact)} className={`px-3 py-1 text-xs rounded-full border-2 transition-colors ${impactFilter.includes(impact) ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'border-brand-border hover:bg-brand-secondary'}`}>
                                        {impact}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div>
                            <div className="text-sm font-semibold text-brand-text-secondary mb-2">Filter by Currency:</div>
                            <div className="flex flex-wrap gap-2">
                                {ALL_CURRENCIES.map(currency => (
                                    <button key={currency} onClick={() => handleCurrencyFilter(currency)} className={`px-3 py-1 text-xs rounded-full border-2 transition-colors font-mono ${currencyFilter.includes(currency) ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'border-brand-border hover:bg-brand-secondary'}`}>
                                        {currency}
                                    </button>
                                ))}
                                {currencyFilter.length > 0 && <button onClick={() => setCurrencyFilter([])} className="text-xs text-brand-accent hover:underline">Clear</button>}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full text-sm text-left text-brand-text-secondary">
                            <thead className="text-xs text-brand-text-secondary uppercase bg-brand-primary/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Waktu</th>
                                    <th scope="col" className="px-4 py-3">Curr.</th>
                                    <th scope="col" className="px-4 py-3">Impact</th>
                                    <th scope="col" className="px-4 py-3">Event</th>
                                    <th scope="col" className="px-4 py-3 text-right">Actual</th>
                                    <th scope="col" className="px-4 py-3 text-right">Forecast</th>
                                    <th scope="col" className="px-4 py-3 text-right">Previous</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                                    <tr key={event.id} className="bg-brand-secondary/30 border-b border-brand-border hover:bg-brand-secondary/80">
                                        <td className="px-4 py-4 font-medium text-white">{event.time}</td>
                                        <td className="px-4 py-4 font-bold text-white">{event.currency}</td>
                                        <td className="px-4 py-4"><ImpactBar impact={event.impact} /></td>
                                        <td className="px-4 py-4 text-white">{event.event}</td>
                                        <td className={`px-4 py-4 text-right font-semibold ${getActualColorClass(event.actual, event.forecast)}`}>{event.actual ?? '-'}</td>
                                        <td className="px-4 py-4 text-right">{event.forecast}</td>
                                        <td className="px-4 py-4 text-right">{event.previous}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-brand-text-secondary">
                                            Tidak ada event yang sesuai dengan filter Anda untuk tanggal ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};