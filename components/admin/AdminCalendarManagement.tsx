import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { usePlatform } from '../../contexts/PlatformContext';
import { EconomicCalendarEvent } from '../../types';
import { Select } from '../Select';
import { PlusIcon } from '../icons/PlusIcon';

const emptyFormState: Omit<EconomicCalendarEvent, 'id'> = {
    date: new Date().toISOString().split('T')[0],
    time: '',
    currency: 'USD',
    event: '',
    impact: 'Medium',
    actual: '',
    forecast: '',
    previous: '',
};

export const AdminCalendarManagement: React.FC = () => {
    const { economicEvents, addEconomicEvent, updateEconomicEvent, deleteEconomicEvent } = usePlatform();
    
    const [formState, setFormState] = useState(emptyFormState);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (event: EconomicCalendarEvent) => {
        setEditingId(event.id);
        setFormState({
            date: event.date,
            time: event.time,
            currency: event.currency,
            event: event.event,
            impact: event.impact,
            actual: event.actual || '',
            forecast: event.forecast,
            previous: event.previous,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormState(emptyFormState);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.date || !formState.time || !formState.event) {
            alert('Tanggal, Waktu, dan Nama Event harus diisi.');
            return;
        }

        const dataToSave = {
            ...formState,
            actual: formState.actual === '' ? null : formState.actual,
        };

        if (editingId !== null) {
            updateEconomicEvent(editingId, dataToSave);
        } else {
            addEconomicEvent(dataToSave);
        }
        handleCancelEdit();
    };
    
    const handleDelete = (id: number) => {
        if(window.confirm('Anda yakin ingin menghapus event ini?')) {
            deleteEconomicEvent(id);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
                <Card title={editingId ? "Edit Event Ekonomi" : "Tambah Event Ekonomi"} description="Kelola jadwal berita ekonomi penting.">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input name="date" label="Tanggal" type="date" value={formState.date} onChange={handleInputChange} required />
                        <Input name="time" label="Waktu (WIB)" type="time" value={formState.time} onChange={handleInputChange} required />
                        <Select name="currency" label="Mata Uang" value={formState.currency} onChange={handleInputChange} options={['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']} />
                        <Input name="event" label="Nama Event" type="text" placeholder="e.g., Non-Farm Payrolls" value={formState.event} onChange={handleInputChange} required />
                        <Select name="impact" label="Dampak" value={formState.impact} onChange={handleInputChange} options={['High', 'Medium', 'Low']} />
                        <Input name="actual" label="Actual" type="text" placeholder="e.g., 272K (isi setelah rilis)" value={formState.actual || ''} onChange={handleInputChange} />
                        <Input name="forecast" label="Forecast" type="text" placeholder="e.g., 182K" value={formState.forecast} onChange={handleInputChange} />
                        <Input name="previous" label="Previous" type="text" placeholder="e.g., 165K" value={formState.previous} onChange={handleInputChange} />
                        
                        <div className="pt-2 flex gap-4">
                            {editingId && (
                                <Button type="button" variant="secondary" onClick={handleCancelEdit}>Batal</Button>
                            )}
                            <Button type="submit">{editingId ? 'Simpan Perubahan' : 'Tambah Event'}</Button>
                        </div>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card title="Jadwal Event Akan Datang" description="Daftar event yang telah dijadwalkan.">
                     <div className="space-y-3 max-h-[600px] overflow-y-auto">
                         {economicEvents.length > 0 ? [...economicEvents].sort((a,b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()).map(event => (
                            <li key={event.id} className="flex justify-between items-center bg-brand-primary p-4 rounded-lg list-none">
                                 <div>
                                    <p className="font-semibold text-white">{event.currency}: {event.event}</p>
                                    <p className="text-sm text-brand-text-secondary">{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'short' })} @ {event.time}</p>
                                 </div>
                                 <div className="flex space-x-2">
                                     <button onClick={() => handleEdit(event)} className="p-2 hover:bg-brand-secondary rounded-full text-brand-text-secondary hover:text-white"><EditIcon /></button>
                                     <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-brand-secondary rounded-full text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                                 </div>
                            </li>
                         )) : <p className="text-center text-brand-text-secondary py-4">Belum ada event yang ditambahkan.</p>}
                     </div>
                </Card>
            </div>
        </div>
    );
};