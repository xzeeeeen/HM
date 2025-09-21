import React from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';
import { useAuth } from '../../contexts/AuthContext';

export const SettingsView: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Pengaturan Akun</h1>
            <p className="mt-1 text-md text-brand-text-secondary">
                Kelola informasi profil, preferensi, dan keamanan akun Anda.
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Informasi Profil" description="Perbarui informasi pribadi Anda.">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <Input label="Nama Lengkap" type="text" defaultValue={user?.name} />
                        <Input label="Alamat Email" type="email" defaultValue={user?.email} readOnly />
                         <div className="pt-2">
                             <Button type="submit">Simpan Perubahan</Button>
                        </div>
                    </form>
                </Card>
                 <Card title="Notifikasi Email" description="Pilih pembaruan yang ingin Anda terima.">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-white">Ringkasan Mingguan</span>
                            <ToggleSwitch checked={true} onChange={() => {}} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-white">Pengumuman Event Baru</span>
                            <ToggleSwitch checked={true} onChange={() => {}} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-white">Balasan di Forum</span>
                            <ToggleSwitch checked={false} onChange={() => {}} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
