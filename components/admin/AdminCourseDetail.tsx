import React, { useState } from 'react';
import { Course, Module, Lesson } from '../../types';
import { usePlatform } from '../../contexts/PlatformContext';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { PlusIcon, EditIcon, DeleteIcon } from '../icons';

// --- Form Modals ---

const CourseFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    course: Course;
}> = ({ isOpen, onClose, course }) => {
    const { updateCourse } = usePlatform();
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [category, setCategory] = useState(course.category);
    const [status, setStatus] = useState(course.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCourse(course.id, { title, description, category, status });
        onClose();
    };

    return (
        <Modal title="Edit Detail Kursus" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Judul Kursus" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea label="Deskripsi" value={description} onChange={e => setDescription(e.target.value)} required rows={4} />
                <Select label="Kategori" value={category} onChange={e => setCategory(e.target.value as Course['category'])} options={['Trading Forex', 'Cryptocurrency', 'Bisnis']} />
                <Select label="Status" value={status} onChange={e => setStatus(e.target.value as Course['status'])} options={['Draft', 'Published']} />
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="!w-auto">Batal</Button>
                    <Button type="submit" className="!w-auto">Simpan Perubahan</Button>
                </div>
            </form>
        </Modal>
    );
};

const ModuleFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    courseId: number;
    moduleToEdit: Module | null;
}> = ({ isOpen, onClose, courseId, moduleToEdit }) => {
    const { addModule, updateModule } = usePlatform();
    const [title, setTitle] = useState('');
    
    React.useEffect(() => {
        setTitle(moduleToEdit?.title || '');
    }, [moduleToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (moduleToEdit) {
            updateModule(courseId, moduleToEdit.id, { title });
        } else {
            addModule(courseId, { title });
        }
        onClose();
    };

    return (
        <Modal title={moduleToEdit ? 'Edit Modul' : 'Tambah Modul Baru'} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Judul Modul" value={title} onChange={e => setTitle(e.target.value)} required />
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="!w-auto">Batal</Button>
                    <Button type="submit" className="!w-auto">Simpan Modul</Button>
                </div>
            </form>
        </Modal>
    );
};

const LessonFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    courseId: number;
    moduleId: number;
    lessonToEdit: Lesson | null;
}> = ({ isOpen, onClose, courseId, moduleId, lessonToEdit }) => {
    const { addLesson, updateLesson } = usePlatform();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

     React.useEffect(() => {
        setTitle(lessonToEdit?.title || '');
        setContent(lessonToEdit?.content || '');
        setVideoUrl(lessonToEdit?.videoUrl || '');
    }, [lessonToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lessonData = { title, content, videoUrl };
        if (lessonToEdit) {
            updateLesson(courseId, moduleId, lessonToEdit.id, lessonData);
        } else {
            addLesson(courseId, moduleId, lessonData);
        }
        onClose();
    };

    return (
        <Modal title={lessonToEdit ? 'Edit Materi' : 'Tambah Materi Baru'} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Judul Materi" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea label="Konten Materi" value={content} onChange={e => setContent(e.target.value)} required rows={8} />
                <Input label="URL Video (Opsional)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/..."/>
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="!w-auto">Batal</Button>
                    <Button type="submit" className="!w-auto">Simpan Materi</Button>
                </div>
            </form>
        </Modal>
    );
}


// --- Main Component ---

export const AdminCourseDetail: React.FC<{ course: Course }> = ({ course }) => {
    const { deleteCourse, deleteModule, deleteLesson } = usePlatform();
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    // Modal States
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
    const [moduleToEdit, setModuleToEdit] = useState<Module | null>(null);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
    const [currentModuleIdForLesson, setCurrentModuleIdForLesson] = useState<number | null>(null);

    const handleDeleteCourse = () => {
        if (window.confirm(`Anda yakin ingin menghapus kursus "${course.title}"? Tindakan ini tidak dapat diurungkan.`)) {
            deleteCourse(course.id);
        }
    };

    const handleDeleteModule = (moduleId: number) => {
        if (window.confirm("Anda yakin ingin menghapus modul ini?")) {
            deleteModule(course.id, moduleId);
        }
    };
    
    const handleDeleteLesson = (moduleId: number, lessonId: number) => {
        if (window.confirm("Anda yakin ingin menghapus materi ini?")) {
            deleteLesson(course.id, moduleId, lessonId);
        }
    };


    return (
        <div className="animate-fade-in-up">
            {/* Course Header */}
            <div className="pb-4 border-b border-brand-border">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-brand-text-secondary">{course.category} / {course.status}</p>
                        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={() => setIsCourseModalOpen(true)} variant="secondary" className="!w-auto !py-2 px-3"><EditIcon /></Button>
                        <Button onClick={handleDeleteCourse} className="!w-auto !py-2 px-3 !bg-brand-red"><DeleteIcon /></Button>
                    </div>
                </div>
                <p className="mt-2 text-brand-text-secondary">{course.description}</p>
            </div>
            
            {/* Modules Section */}
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Modul Pembelajaran</h2>
                    <Button onClick={() => { setModuleToEdit(null); setIsModuleModalOpen(true); }} className="!w-auto !py-2">
                        <PlusIcon className="w-5 h-5 mr-2" /> Tambah Modul
                    </Button>
                </div>
                <div className="space-y-3">
                    {course.modules.map(module => (
                        <div key={module.id} className="bg-brand-primary rounded-lg">
                            <div className="flex items-center justify-between p-4">
                                <button onClick={() => setExpandedModuleId(expandedModuleId === module.id ? null : module.id)} className="flex-grow text-left">
                                    <h3 className="font-semibold text-white">{module.title}</h3>
                                </button>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-brand-text-secondary">{module.lessons.length} Materi</span>
                                    <button onClick={() => { setModuleToEdit(module); setIsModuleModalOpen(true); }} className="p-2 hover:bg-brand-secondary rounded-full"><EditIcon /></button>
                                    <button onClick={() => handleDeleteModule(module.id)} className="p-2 hover:bg-brand-secondary rounded-full text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                                </div>
                            </div>

                            {/* Lessons List (Collapsible) */}
                            {expandedModuleId === module.id && (
                                <div className="border-t border-brand-border p-4 space-y-2 animate-fade-in-up">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} className="flex items-center justify-between bg-brand-secondary p-3 rounded-md">
                                            <p className="text-brand-text-primary">{lesson.title}</p>
                                            <div className="flex items-center space-x-1">
                                                <button onClick={() => { setLessonToEdit(lesson); setCurrentModuleIdForLesson(module.id); setIsLessonModalOpen(true); }} className="p-2 hover:bg-brand-primary rounded-full"><EditIcon /></button>
                                                <button onClick={() => handleDeleteLesson(module.id, lesson.id)} className="p-2 hover:bg-brand-primary rounded-full text-brand-text-secondary hover:text-red-400"><DeleteIcon /></button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => { setLessonToEdit(null); setCurrentModuleIdForLesson(module.id); setIsLessonModalOpen(true); }} variant="secondary" className="!w-full mt-3">Tambah Materi Baru</Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {isCourseModalOpen && <CourseFormModal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} course={course} />}
            {isModuleModalOpen && <ModuleFormModal isOpen={isModuleModalOpen} onClose={() => setIsModuleModalOpen(false)} courseId={course.id} moduleToEdit={moduleToEdit} />}
            {isLessonModalOpen && currentModuleIdForLesson && <LessonFormModal isOpen={isLessonModalOpen} onClose={() => setIsLessonModalOpen(false)} courseId={course.id} moduleId={currentModuleIdForLesson} lessonToEdit={lessonToEdit} />}

        </div>
    );
};
