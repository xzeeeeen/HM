import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { ToggleSwitch } from '../ToggleSwitch';

export const AdminSettings: React.FC = () => {
    const [siteName, setSiteName] = useState('Human Minority');
    const [tagline, setTagline] = useState('Chase your dreams, exceed expectations.');
    const [socials, setSocials] = useState({ twitter: 'https://twitter.com/humanminority', discord: 'https://discord.gg/humanminority', telegram: 'https://t.me/humanminority' });
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocials(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (section: string) => {
        alert(`${section} settings have been saved! (Simulated)`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card title="Pengaturan Website Umum" description="Kelola informasi dasar dan branding website Anda.">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveChanges('General'); }}>
                    <Input label="Nama Situs" type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                    <Input label="Tagline Situs" type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                    <div className="pt-2">
                        <Button type="submit" className="!w-auto">Simpan Perubahan</Button>
                    </div>
                </form>
            </Card>

             <Card title="Tautan Media Sosial" description="Hubungkan profil media sosial Anda ke website.">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveChanges('Social Media'); }}>
                    <Input name="twitter" label="URL Twitter" type="url" placeholder="https://twitter.com/yourprofile" value={socials.twitter} onChange={handleSocialChange} />
                    <Input name="discord" label="URL Discord" type="url" placeholder="https://discord.gg/yourserver" value={socials.discord} onChange={handleSocialChange} />
                    <Input name="telegram" label="URL Telegram" type="url" placeholder="https://t.me/yourchannel" value={socials.telegram} onChange={handleSocialChange} />
                    <div className="pt-2">
                        <Button type="submit" className="!w-auto">Simpan Tautan</Button>
                    </div>
                </form>
            </Card>

            <Card title="Mode Perawatan" description="Aktifkan untuk menampilkan halaman perawatan saat melakukan pembaruan besar.">
                <div className="flex items-center justify-between bg-brand-primary p-4 rounded-lg">
                    <div>
                        <h3 className="font-semibold text-white">Aktifkan Mode Perawatan</h3>
                        <p className="text-sm text-brand-text-secondary">Hanya admin yang dapat mengakses situs.</p>
                    </div>
                    <ToggleSwitch checked={maintenanceMode} onChange={setMaintenanceMode} />
                </div>
            </Card>
        </div>
    );
};