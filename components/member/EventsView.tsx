import React from 'react';
import { usePlatform } from '../../contexts/PlatformContext';
import { Button } from '../Button';

export const EventsView: React.FC = () => {
    const { upcomingEvents } = usePlatform();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Event & Webinar</h1>
            <p className="mt-1 text-md text-brand-text-secondary">
                Ikuti acara live kami untuk mendapatkan wawasan langsung dari para ahli.
            </p>

            <div className="mt-8 space-y-6">
                 {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                    <div key={event.id} className="bg-brand-secondary border border-brand-border rounded-lg p-6 shadow-lg md:flex items-center justify-between">
                        <div>
                            <p className="text-xs text-brand-accent font-semibold">{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {event.time}</p>
                            <h3 className="text-xl font-semibold text-white mt-1">{event.title}</h3>
                            <p className="text-brand-text-secondary text-sm mt-1">{event.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                                <Button className="!w-auto px-6">Daftar Sekarang</Button>
                            </a>
                        </div>
                    </div>
                )) : (
                     <div className="bg-brand-secondary border border-brand-border rounded-lg p-6 shadow-lg h-64 flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl font-bold text-brand-text-secondary">Tidak Ada Acara Terjadwal</h2>
                        <p className="mt-2 text-brand-text-secondary">Silakan periksa kembali nanti untuk jadwal webinar atau acara komunitas berikutnya.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
