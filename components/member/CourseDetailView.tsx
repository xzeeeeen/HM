import React, { useState, useMemo } from 'react';
import { Course, Lesson, Module, Quiz } from '../../types';
import { usePlatform } from '../../contexts/PlatformContext';
import { Button } from '../Button';
import { QuizView } from './QuizView';
import { CheckCircleIcon, LockClosedIcon } from '../icons';

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
}

const LessonItem: React.FC<{ 
    lesson: Lesson; 
    isCompleted: boolean; 
    onComplete: () => void; 
    isLocked: boolean 
}> = ({ lesson, isCompleted, onComplete, isLocked }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        if (isLocked) return;
        // Mark as complete on the first interaction
        if (!isCompleted) {
            onComplete();
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`rounded-lg overflow-hidden transition-all duration-300 ${isLocked ? 'bg-black/20 opacity-50' : 'bg-brand-primary/50'}`}>
            <button 
                onClick={handleToggleExpand} 
                disabled={isLocked}
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center space-x-3">
                    {isCompleted ? <CheckCircleIcon className="w-6 h-6 text-brand-green flex-shrink-0" /> : <div className="w-6 h-6 rounded-full border-2 border-brand-text-secondary flex-shrink-0"></div>}
                    <h4 className={`font-semibold ${isLocked ? 'text-brand-text-secondary' : 'text-white'}`}>{lesson.title}</h4>
                </div>
                <svg className={`w-5 h-5 text-brand-text-secondary transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded && !isLocked ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="p-4 border-t border-brand-border/50">
                        <p className="text-brand-text-secondary whitespace-pre-wrap">{lesson.content}</p>
                        {lesson.videoUrl && (
                            <div className="mt-4 aspect-video">
                                <iframe 
                                    src={lesson.videoUrl}
                                    title={lesson.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                    className="w-full h-full rounded-md border border-brand-border"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModuleSection: React.FC<{ 
    courseId: number; 
    module: Module; 
    isLocked: boolean; 
    onStartQuiz: (quiz: Quiz) => void 
}> = ({ courseId, module, isLocked, onStartQuiz }) => {
    const { memberProfile, completeLesson } = usePlatform();
    const courseProgress = memberProfile.courseProgress[courseId];
    const completedLessons = courseProgress?.completedLessonIds || new Set();
    
    const lessonsInModule = module.lessons.length;
    const completedLessonsInModule = module.lessons.filter(l => completedLessons.has(l.id)).length;
    const progressPercentage = lessonsInModule > 0 ? Math.round((completedLessonsInModule / lessonsInModule) * 100) : 0;
    
    const allLessonsCompleted = lessonsInModule > 0 && completedLessonsInModule === lessonsInModule;
    const isQuizButtonDisabled = isLocked || !allLessonsCompleted;

    const handleCompleteLesson = (lessonId: number) => {
        completeLesson(courseId, lessonId);
    };

    return (
        <div className={`bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg p-6 shadow-lg transition-opacity ${isLocked ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                {isLocked && <LockClosedIcon className="w-6 h-6 text-brand-text-secondary" />}
            </div>
            <div className="flex items-center space-x-4 mt-2">
                <div className="w-full bg-brand-secondary rounded-full h-2 border border-brand-border">
                    <div className="bg-brand-accent h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span className="text-sm font-medium text-brand-text-secondary">{progressPercentage}%</span>
            </div>
            <div className="mt-6 space-y-3">
                {module.lessons.map(lesson => (
                    <LessonItem 
                        key={lesson.id} 
                        lesson={lesson}
                        isCompleted={completedLessons.has(lesson.id)}
                        onComplete={() => handleCompleteLesson(lesson.id)}
                        isLocked={isLocked}
                    />
                ))}
            </div>
             <div className="mt-6 border-t border-brand-border pt-4">
                <Button onClick={() => onStartQuiz(module.quiz)} disabled={isQuizButtonDisabled}>
                    {isLocked 
                        ? 'Selesaikan modul sebelumnya' 
                        : allLessonsCompleted 
                            ? 'Mulai Kuis Modul' 
                            : `Selesaikan ${lessonsInModule - completedLessonsInModule} materi lagi untuk membuka kuis`}
                </Button>
            </div>
        </div>
    );
};


export const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
    const { memberProfile } = usePlatform();
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

    const completedModules = useMemo(() => {
        const progress = memberProfile.courseProgress[course.id];
        return progress ? progress.completedModuleIds : new Set();
    }, [memberProfile.courseProgress, course.id]);

    if (activeQuiz) {
        return (
            <div className="max-w-4xl mx-auto">
                <QuizView
                    courseId={course.id}
                    quiz={activeQuiz}
                    onComplete={() => {
                        setActiveQuiz(null); // Return to course view after quiz
                    }}
                />
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in-up">
            <button onClick={onBack} className="text-brand-accent hover:text-brand-accent-hover mb-6">&larr; Kembali ke Kursus</button>
            <h1 className="text-4xl font-bold text-white">{course.title}</h1>
            <p className="mt-2 text-lg text-brand-text-secondary">{course.description}</p>
            
            <div className="mt-8 space-y-6">
                {course.modules.map((module, index) => {
                    const isPreviousModuleCompleted = index === 0 || completedModules.has(course.modules[index - 1].id);
                    return (
                        <ModuleSection
                            key={module.id}
                            courseId={course.id}
                            module={module}
                            isLocked={!isPreviousModuleCompleted}
                            onStartQuiz={setActiveQuiz}
                        />
                    )
                })}
            </div>
        </div>
    );
};