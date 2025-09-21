import React, { useState } from 'react';
import { AiContentGenerator } from './AiContentGenerator';
import { usePlatform } from '../../contexts/PlatformContext';
import { Course } from '../../types';
import { Button } from '../Button';
import { AdminCourseDetail } from './AdminCourseDetail';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';
import { PlusIcon } from '../icons/PlusIcon';

const CourseForm: React.FC<{ 
    onClose: () => void;
    onSave: (courseData: Omit<Course, 'id' | 'modules'>) => void;
}> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Course['category']>('Trading Forex');
    const [status, setStatus] = useState<Course['status']>('Draft');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Judul dan Deskripsi harus diisi.');
            return;
        }
        onSave({ title, description, category, status });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Judul Kursus" value={title} onChange={e => setTitle(e.target.value)} required />
            <Input label="Deskripsi" value={description} onChange={e => setDescription(e.target.value)} required />
            <Select 
                label="Kategori" 
                value={category} 
                onChange={e => setCategory(e.target.value as Course['category'])}
                options={['Trading Forex', 'Cryptocurrency', 'Bisnis']}
            />
            <Select 
                label="Status"
                value={status}
                onChange={e => setStatus(e.target.value as Course['status'])}
                options={['Draft', 'Published']}
            />
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onClose} className="!w-auto">Batal</Button>
                <Button type="submit" className="!w-auto">Simpan Kursus</Button>
            </div>
        </form>
    );
};

export const AdminContentManagement: React.FC = () => {
    const { courses, addCourse } = usePlatform();
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

    const selectedCourse = courses.find(c => c.id === selectedCourseId) || null;

    const handleSaveNewCourse = (courseData: Omit<Course, 'id' | 'modules'>) => {
        addCourse(courseData);
        setIsAddCourseModalOpen(false);
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Manajemen Konten</h1>
                <p className="mt-1 text-md text-brand-text-secondary">
                    Buat dan kelola materi edukasi. Gunakan AI untuk mempercepat proses pembuatan konten.
                </p>
            </div>
            
            <AiContentGenerator />
            
            <div className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg shadow-lg">
                <div className="grid grid-cols-12 min-h-[600px]">
                    {/* Left Pane: Course List */}
                    <div className="col-span-4 border-r border-brand-border p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Daftar Kursus</h2>
                             <Button onClick={() => setIsAddCourseModalOpen(true)} className="!w-auto !py-2 px-3">
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {courses.map(course => (
                                <button 
                                    key={course.id}
                                    onClick={() => setSelectedCourseId(course.id)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCourseId === course.id ? 'bg-brand-accent/10 text-brand-accent-hover' : 'hover:bg-brand-primary/50'}`}
                                >
                                    <h3 className="font-semibold">{course.title}</h3>
                                    <p className="text-xs text-brand-text-secondary">{course.category}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Pane: Course Detail */}
                    <div className="col-span-8 p-6">
                        {selectedCourse ? (
                            <AdminCourseDetail key={selectedCourse.id} course={selectedCourse} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-brand-text-secondary text-center">
                                <div>
                                    <h2 className="text-2xl font-bold">Pilih Kursus</h2>
                                    <p>Pilih kursus dari daftar di sebelah kiri untuk mulai mengelola modul dan materinya.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <Modal title="Buat Kursus Baru" isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)}>
                <CourseForm onClose={() => setIsAddCourseModalOpen(false)} onSave={handleSaveNewCourse} />
            </Modal>
        </div>
    );
};
