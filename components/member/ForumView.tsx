import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';

const mockTopPosts = [
    {id: 1, title: "Analisa EUR/USD untuk minggu depan?", author: "TraderJoe", replies: 12, category: "Analisa Forex"},
    {id: 2, title: "Potensi Altcoin di Q4 2024", author: "CryptoJane", replies: 45, category: "Diskusi Crypto"},
    {id: 3, title: "Bagaimana cara memulai bisnis dropshipping?", author: "NewbieAlex", replies: 5, category: "Strategi Bisnis"},
]

export const ForumView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Forum Diskusi</h1>
                    <p className="mt-1 text-md text-brand-text-secondary">
                        Bertanya, berbagi, dan berdiskusi dengan sesama anggota komunitas.
                    </p>
                </div>
                <Button className="!w-auto">Buat Postingan Baru</Button>
            </div>

            <div className="mt-8">
                 <Card title="Topik Populer" description="Diskusi yang sedang hangat di komunitas.">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-brand-text-secondary">
                            <thead className="text-xs text-brand-text-secondary uppercase bg-brand-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Topik</th>
                                    <th scope="col" className="px-6 py-3">Kategori</th>
                                    <th scope="col" className="px-6 py-3">Balasan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTopPosts.map((post) => (
                                    <tr key={post.id} className="bg-brand-secondary border-b border-brand-border hover:bg-brand-primary cursor-pointer">
                                        <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                                        <td className="px-6 py-4">{post.category}</td>
                                        <td className="px-6 py-4">{post.replies}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
            </div>
        </div>
    );
};
