import React, { useState } from 'react';
import { Course, CourseCategory } from '../../types';
import { usePlatform } from '../../contexts/PlatformContext';
import { BriefcaseIcon, CryptoIcon, TrendingUpIcon } from '../icons';

interface EducationHomeProps {
    courses: Course[];
    onSelectCourse: (course: Course) => void;
}

const CourseCard: React.FC<{ course: Course; progress: number; onSelect: () => void; }> = ({ course, progress, onSelect }) => (
    <div onClick={onSelect} className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg p-6 shadow-lg hover:border-brand-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] cursor-pointer h-full flex flex-col">
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
            <p className="mt-2 text-brand-text-secondary text-sm">{course.description}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4">
            <div className="w-full bg-brand-secondary rounded-full h-2.5 border border-brand-border">
                <div className="bg-brand-accent h-full rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-sm font-medium text-brand-text-secondary">{progress}%</span>
        </div>
    </div>
);

const CategoryCard: React.FC<{icon:React.ReactNode, title: string, onClick: () => void}> = ({ icon, title, onClick }) => (
    <div onClick={onClick} className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg p-8 shadow-lg hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center">
        <div className="flex justify-center text-brand-accent">{icon}</div>
        <h3 className="text-2xl font-bold text-white mt-4">{title}</h3>
    </div>
);


export const EducationHome: React.FC<EducationHomeProps> = ({ courses, onSelectCourse }) => {
    const { memberProfile } = usePlatform();
    const [selectedCategory, setSelectedCategory] = useState<CourseCategory | null>(null);

    const categories: { name: CourseCategory, icon: React.ReactNode }[] = [
        { name: 'Trading Forex', icon: <TrendingUpIcon /> },
        { name: 'Cryptocurrency', icon: <CryptoIcon /> },
        { name: 'Bisnis', icon: <BriefcaseIcon /> },
    ];
    
    const filteredCourses = courses.filter(c => c.category === selectedCategory && c.status === 'Published');

    if (selectedCategory) {
        return (
             <div>
                <button onClick={() => setSelectedCategory(null)} className="text-brand-accent hover:text-brand-accent-hover mb-6">&larr; Kembali ke Kategori</button>
                <h1 className="text-3xl font-bold text-white">{selectedCategory}</h1>
                <p className="mt-1 text-md text-brand-text-secondary">
                    Pilih kursus untuk memulai perjalanan belajar Anda.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                     {filteredCourses.map(course => {
                        const progressData = memberProfile.courseProgress[course.id];
                        const completedCount = progressData ? progressData.completedModuleIds.size : 0;
                        const total = course.modules.length;
                        const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
                        return (
                            <CourseCard 
                                key={course.id} 
                                course={course}
                                progress={percentage}
                                onSelect={() => onSelectCourse(course)} 
                            />
                        );
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Materi Edukasi</h1>
            <p className="mt-1 text-md text-brand-text-secondary">
                Pilih kategori di bawah ini untuk memulai perjalanan belajar Anda.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map(cat => (
                    <CategoryCard key={cat.name} icon={cat.icon} title={cat.name} onClick={() => setSelectedCategory(cat.name)} />
                ))}
            </div>
        </div>
    );
};
