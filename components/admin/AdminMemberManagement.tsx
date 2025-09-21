import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { usePlatform } from '../../contexts/PlatformContext';
import { Modal } from '../Modal';
import { User } from '../../types';
import { Select } from '../Select';
import { PlusIcon } from '../icons/PlusIcon';

const MemberFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    memberToEdit: User | null;
}> = ({ isOpen, onClose, memberToEdit }) => {
    const { addMember, updateMember } = usePlatform();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<User['status']>('Active');
    
    useEffect(() => {
        if (memberToEdit) {
            setName(memberToEdit.name);
            setEmail(memberToEdit.email);
            setStatus(memberToEdit.status);
        } else {
            // Reset form for new member
            setName('');
            setEmail('');
            setStatus('Active');
        }
    }, [memberToEdit, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (memberToEdit) {
            updateMember(memberToEdit.id, { name, email, status });
        } else {
            addMember({ name, email, status, role: 'member' });
        }
        onClose();
    };

    return (
        <Modal title={memberToEdit ? 'Edit Member' : 'Tambah Member Baru'} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} required />
                <Input label="Alamat Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Select
                    label="Status Akun"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as User['status'])}
                    options={['Active', 'Banned']}
                />
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="!w-auto">Batal</Button>
                    <Button type="submit" className="!w-auto">Simpan</Button>
                </div>
            </form>
        </Modal>
    );
};


export const AdminMemberManagement: React.FC = () => {
    const { members, deleteMember } = usePlatform();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<User | null>(null);

    const handleAddMember = () => {
        setMemberToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditMember = (member: User) => {
        setMemberToEdit(member);
        setIsModalOpen(true);
    };

    const handleDeleteMember = (id: string, name: string) => {
        if (window.confirm(`Anda yakin ingin menghapus member "${name}"? Tindakan ini tidak dapat diurungkan.`)) {
            deleteMember(id);
        }
    };

    const filteredMembers = useMemo(() => {
        return members.filter(member => 
            (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            member.role === 'member'
        );
    }, [members, searchTerm]);

    return (
        <>
            <Card title="Manajemen Member" description="Kelola, lihat detail, dan ambil tindakan pada akun member.">
                <div className="flex justify-between items-center mb-6">
                    <div className="w-1/3">
                        <Input 
                            label="" 
                            type="search" 
                            placeholder="Cari member..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button className="!w-auto" onClick={handleAddMember}>
                        <PlusIcon className="w-5 h-5 mr-2"/>
                        Tambah Member
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-text-secondary">
                        <thead className="text-xs text-brand-text-secondary uppercase bg-brand-primary">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nama</th>
                                <th scope="col" className="px-6 py-3">Tanggal Bergabung</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="bg-brand-secondary border-b border-brand-border hover:bg-brand-primary">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        <div className="font-bold">{member.name}</div>
                                        <div className="text-xs text-brand-text-secondary">{member.email}</div>
                                    </th>
                                    <td className="px-6 py-4">{member.joined}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEditMember(member)} className="p-2 hover:bg-brand-primary rounded-full text-brand-text-secondary hover:text-white"><EditIcon /></button>
                                        <button onClick={() => handleDeleteMember(member.id, member.name)} className="p-2 hover:bg-brand-primary rounded-full text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <MemberFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                memberToEdit={memberToEdit}
            />
        </>
    );
};