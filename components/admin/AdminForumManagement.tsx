import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { DeleteIcon } from '../icons/DeleteIcon';

const initialCategories = ['Analisa Forex', 'Diskusi Crypto', 'Strategi Bisnis', 'Tanya Jawab Umum'];
const initialReportedPosts = [
    { id: 1, user: 'SpamBot99', content: '>>> CLICK HERE FOR FREE MONEY! <<<', reason: 'Spam / Iklan' },
    { id: 2, user: 'TraderGal', content: 'This analysis is completely wrong, you are all idiots.', reason: 'Ujaran Kebencian / Tidak Sopan' },
];

export const AdminForumManagement: React.FC = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [reportedPosts, setReportedPosts] = useState(initialReportedPosts);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories(prev => [...prev, newCategory]);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = (category: string) => {
        setCategories(prev => prev.filter(cat => cat !== category));
    };

    const handleModeratePost = (postId: number) => {
        setReportedPosts(prev => prev.filter(post => post.id !== postId));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Manajemen Kategori Forum" description="Tambah atau hapus kategori diskusi.">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Input 
                            label="" 
                            type="text" 
                            placeholder="Nama kategori baru" 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <Button className="!w-auto px-6 self-end" onClick={handleAddCategory}>Tambah</Button>
                    </div>
                    <ul className="space-y-2 pt-4">
                        {categories.map(cat => (
                            <li key={cat} className="flex justify-between items-center bg-brand-primary p-3 rounded-lg">
                                <span className="font-medium text-white">{cat}</span>
                                <button onClick={() => handleDeleteCategory(cat)} className="p-2 text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            <Card title="Postingan Dilaporkan" description="Tinjau dan ambil tindakan pada postingan yang melanggar aturan.">
                <div className="space-y-4">
                    {reportedPosts.length > 0 ? reportedPosts.map(post => (
                        <div key={post.id} className="bg-brand-primary p-4 rounded-lg">
                            <p className="text-brand-text-secondary italic">"{post.content}"</p>
                            <div className="text-xs mt-2 text-brand-text-secondary">
                                Dilaporkan oleh: <span className="font-semibold text-white">{post.user}</span> | Alasan: <span className="font-semibold text-white">{post.reason}</span>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button onClick={() => handleModeratePost(post.id)} variant="secondary" className="!w-auto !py-1.5 px-4 text-sm">Abaikan</Button>
                                <Button onClick={() => handleModeratePost(post.id)} className="!w-auto !py-1.5 px-4 text-sm !bg-brand-red">Hapus Postingan</Button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-brand-text-secondary">Tidak ada postingan yang dilaporkan saat ini.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};