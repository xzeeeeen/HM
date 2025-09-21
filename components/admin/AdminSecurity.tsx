import React, { useState } from 'react';
import { Card } from '../Card';
import { ToggleSwitch } from '../ToggleSwitch';

const loginAttempts = [
    { user: 'admin', ip: '192.168.1.1', status: 'Success', time: '2 mins ago' },
    { user: 'guest', ip: '101.45.23.12', status: 'Failed', time: '5 mins ago' },
    { user: 'TraderJoe', ip: '202.88.1.50', status: 'Success', time: '1 hour ago' },
];

export const AdminSecurity: React.FC = () => {
    const [policies, setPolicies] = useState({
        require2FA: false,
        requireStrongPassword: true,
    });

    const handleToggle = (policy: keyof typeof policies) => {
        setPolicies(prev => ({ ...prev, [policy]: !prev[policy] }));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Kebijakan Keamanan" description="Terapkan aturan keamanan untuk semua akun member.">
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-brand-primary p-4 rounded-lg">
                        <div>
                            <h3 className="font-semibold text-white">Wajibkan Otentikasi Dua Faktor (2FA)</h3>
                            <p className="text-sm text-brand-text-secondary">Meningkatkan keamanan akun secara signifikan.</p>
                        </div>
                        <ToggleSwitch checked={policies.require2FA} onChange={() => handleToggle('require2FA')} />
                    </div>
                    <div className="flex items-center justify-between bg-brand-primary p-4 rounded-lg">
                        <div>
                            <h3 className="font-semibold text-white">Wajibkan Kata Sandi Kuat</h3>
                             <p className="text-sm text-brand-text-secondary">Min. 8 karakter, huruf besar, angka, & simbol.</p>
                        </div>
                        <ToggleSwitch checked={policies.requireStrongPassword} onChange={() => handleToggle('requireStrongPassword')} />
                    </div>
                </div>
            </Card>
             <Card title="Aktivitas Login Terbaru" description="Pantau upaya login yang berhasil dan gagal.">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-text-secondary">
                        <thead className="text-xs text-brand-text-secondary uppercase bg-brand-primary">
                            <tr>
                                <th scope="col" className="px-4 py-3">User</th>
                                <th scope="col" className="px-4 py-3">IP Address</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                                <th scope="col" className="px-4 py-3">Waktu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loginAttempts.map((attempt, index) => (
                                <tr key={index} className="border-b border-brand-border hover:bg-brand-primary">
                                    <td className="px-4 py-3 font-medium text-white">{attempt.user}</td>
                                    <td className="px-4 py-3">{attempt.ip}</td>
                                    <td className="px-4 py-3">
                                         <span className={`font-semibold ${attempt.status === 'Success' ? 'text-green-400' : 'text-red-400'}`}>
                                            {attempt.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{attempt.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </Card>
        </div>
    );
};