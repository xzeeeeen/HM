import React from 'react';
import { Card } from '../Card';
import { ToggleSwitch } from '../ToggleSwitch';
import { Button } from '../Button';
import { usePlatform } from '../../contexts/PlatformContext';

export const AdminToolsManagement: React.FC = () => {
    const { tools, toggleTool } = usePlatform();

    return (
        <Card title="Manajemen Tools Trading" description="Aktifkan atau nonaktifkan tools trading yang tersedia untuk member.">
            <div className="space-y-4">
                {tools.map(tool => (
                    <div key={tool.id} className="flex justify-between items-center bg-brand-primary p-4 rounded-lg">
                        <span className="font-semibold text-white">{tool.name}</span>
                        <ToggleSwitch checked={tool.enabled} onChange={() => toggleTool(tool.id)} />
                    </div>
                ))}
            </div>
             <div className="mt-6 border-t border-brand-border pt-6">
                <Button variant="secondary" onClick={() => alert('Fungsi Tambah Tool akan diimplementasikan.')}>Tambah Tool Baru</Button>
            </div>
        </Card>
    );
};