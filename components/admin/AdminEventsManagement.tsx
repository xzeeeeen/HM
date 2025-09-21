import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { usePlatform } from '../../contexts/PlatformContext';


export const AdminEventsManagement: React.FC = () => {
    const { upcomingEvents, pastEvents, addEvent, deleteEvent } = usePlatform();
    
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '', link: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEvent.title && newEvent.date && newEvent.time) {
            const eventToAdd = { id: Date.now(), ...newEvent };
            addEvent(eventToAdd);
            setNewEvent({ title: '', date: '', time: '', description: '', link: '' }); // Reset form
        } else {
            alert('Judul, tanggal, dan waktu harus diisi.');
        }
    };
    
    const handleDeleteEvent = (id: number) => {
        if(window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card title="Buat Event Baru" description="Jadwalkan webinar atau acara komunitas baru.">
                    <form className="space-y-4" onSubmit={handleCreateEvent}>
                        <Input name="title" label="Judul Event" type="text" placeholder="e.g., Live Trading Session" value={newEvent.title} onChange={handleInputChange} />
                        <Input name="date" label="Tanggal" type="date" value={newEvent.date} onChange={handleInputChange} />
                        <Input name="time" label="Waktu" type="time" value={newEvent.time} onChange={handleInputChange} />
                        <Input name="description" label="Deskripsi Singkat" type="text" placeholder="Deskripsi singkat event" value={newEvent.description} onChange={handleInputChange} />
                         <Input name="link" label="Tautan Webinar/Event" type="url" placeholder="https://zoom.us/..." value={newEvent.link} onChange={handleInputChange} />
                        <div className="pt-2">
                             <Button type="submit">Simpan Event</Button>
                        </div>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                 <Card title="Acara Akan Datang" description="Kelola acara yang telah dijadwalkan.">
                     <ul className="space-y-3">
                         {upcomingEvents.map(event => (
                            <li key={event.id} className="flex justify-between items-center bg-brand-primary p-4 rounded-lg">
                                 <div>
                                    <p className="font-semibold text-white">{event.title}</p>
                                    <p className="text-sm text-brand-text-secondary">{event.date} at {event.time}</p>
                                 </div>
                                 <div className="flex space-x-2">
                                     <button className="p-2 hover:bg-brand-secondary rounded-full text-brand-text-secondary hover:text-white"><EditIcon /></button>
                                     <button onClick={() => handleDeleteEvent(event.id)} className="p-2 hover:bg-brand-secondary rounded-full text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                                 </div>
                            </li>
                         ))}
                     </ul>
                </Card>
                 <Card title="Arsip Acara" description="Lihat riwayat acara yang sudah selesai.">
                     <ul className="space-y-3">
                         {pastEvents.map(event => (
                            <li key={event.id} className="flex justify-between items-center bg-brand-primary p-4 rounded-lg opacity-60">
                                 <div>
                                    <p className="font-semibold text-white">{event.title}</p>
                                    <p className="text-sm text-brand-text-secondary">{event.date} at {event.time}</p>
                                 </div>
                            </li>
                         ))}
                     </ul>
                </Card>
            </div>
        </div>
    );
};