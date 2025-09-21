import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { PlatformContextType, Course, Module, Lesson, Quiz, CalendarEvent, EconomicCalendarEvent, TradingTool, MemberProfile, User, CourseProgress } from '../types';
import { useToast } from './ToastContext';
import { MOCK_COURSES, MOCK_MEMBERS, MOCK_UPCOMING_EVENTS, MOCK_PAST_EVENTS, MOCK_ECONOMIC_EVENTS, MOCK_TOOLS } from '../utils/mockData';

const initialCourseProgress: CourseProgress = {
    1: { // Course ID 1
        completedLessonIds: new Set([1, 2]),
        completedModuleIds: new Set(),
    },
};

const initialMemberProfile: MemberProfile = {
    userId: '1',
    points: 1250,
    level: 'Pro Trader',
    courseProgress: initialCourseProgress,
    quizScores: { 1: 75 }, // quizId: score
};


const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { addToast } = useToast();
    const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
    const [members, setMembers] = useState<User[]>(MOCK_MEMBERS);
    const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>(MOCK_UPCOMING_EVENTS);
    const [pastEvents, setPastEvents] = useState<CalendarEvent[]>(MOCK_PAST_EVENTS);
    const [economicEvents, setEconomicEvents] = useState<EconomicCalendarEvent[]>(MOCK_ECONOMIC_EVENTS);
    const [tools, setTools] = useState<TradingTool[]>(MOCK_TOOLS);
    const [memberProfile, setMemberProfile] = useState<MemberProfile>(initialMemberProfile);

    // --- Course Management ---
    const addCourse = (courseData: Omit<Course, 'id' | 'modules'>) => {
        setCourses(prev => [...prev, { ...courseData, id: Date.now(), modules: [] }]);
        addToast('Kursus baru berhasil dibuat!', 'success');
    };
    const updateCourse = (courseId: number, updatedData: Partial<Course>) => {
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updatedData } : c));
        addToast('Detail kursus berhasil diperbarui.', 'info');
    };
    const deleteCourse = (courseId: number) => {
        setCourses(prev => prev.filter(c => c.id !== courseId));
        addToast('Kursus berhasil dihapus.', 'success');
    };

    // --- Module Management ---
    const addModule = (courseId: number, moduleData: Omit<Module, 'id' | 'lessons' | 'quiz'>) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                const newModule: Module = { 
                    ...moduleData, 
                    id: Date.now(), 
                    lessons: [], 
                    quiz: { id: Date.now(), moduleId: 0, title: `Kuis ${moduleData.title}`, questions: [], passingScore: 80 }
                };
                return { ...c, modules: [...c.modules, newModule] };
            }
            return c;
        }));
        addToast('Modul baru berhasil ditambahkan.', 'success');
    };
    const updateModule = (courseId: number, moduleId: number, updatedData: Partial<Module>) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                return { ...c, modules: c.modules.map(m => m.id === moduleId ? { ...m, ...updatedData } : m) };
            }
            return c;
        }));
        addToast('Modul berhasil diperbarui.', 'info');
    };
    const deleteModule = (courseId: number, moduleId: number) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                return { ...c, modules: c.modules.filter(m => m.id !== moduleId) };
            }
            return c;
        }));
        addToast('Modul berhasil dihapus.', 'success');
    };

    // --- Lesson Management ---
    const addLesson = (courseId: number, moduleId: number, lessonData: Omit<Lesson, 'id'>) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                return {
                    ...c, modules: c.modules.map(m => {
                        if (m.id === moduleId) {
                            return { ...m, lessons: [...m.lessons, { ...lessonData, id: Date.now() }] };
                        }
                        return m;
                    })
                };
            }
            return c;
        }));
        addToast('Materi baru berhasil ditambahkan.', 'success');
    };
    const updateLesson = (courseId: number, moduleId: number, lessonId: number, updatedData: Partial<Lesson>) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                return {
                    ...c, modules: c.modules.map(m => {
                        if (m.id === moduleId) {
                            return { ...m, lessons: m.lessons.map(l => l.id === lessonId ? { ...l, ...updatedData } : l) };
                        }
                        return m;
                    })
                };
            }
            return c;
        }));
         addToast('Materi berhasil diperbarui.', 'info');
    };
    const deleteLesson = (courseId: number, moduleId: number, lessonId: number) => {
        setCourses(prev => prev.map(c => {
            if (c.id === courseId) {
                return {
                    ...c, modules: c.modules.map(m => {
                        if (m.id === moduleId) {
                            return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
                        }
                        return m;
                    })
                };
            }
            return c;
        }));
        addToast('Materi berhasil dihapus.', 'success');
    };

    // --- Member Profile Management ---
    const completeLesson = (courseId: number, lessonId: number) => {
        setMemberProfile(prev => {
            const newProgress = { ...prev.courseProgress };
            if (!newProgress[courseId]) {
                newProgress[courseId] = { completedLessonIds: new Set(), completedModuleIds: new Set() };
            }
            newProgress[courseId].completedLessonIds.add(lessonId);
            return { ...prev, courseProgress: newProgress };
        });
    };

    const submitQuiz = (courseId: number, moduleId: number, quizId: number, answers: { [key: number]: string }) => {
        const course = courses.find(c => c.id === courseId);
        const module = course?.modules.find(m => m.id === moduleId);
        if (!module) return;

        const score = module.quiz.questions.reduce((acc, q) => answers[q.id] === q.correctAnswer ? acc + 1 : acc, 0);
        const totalQuestions = module.quiz.questions.length;
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        
        setMemberProfile(prev => {
            const newQuizScores = { ...prev.quizScores, [quizId]: Math.max(prev.quizScores[quizId] || 0, percentage) };
            const newProgress = { ...prev.courseProgress };
            
            if (percentage >= module.quiz.passingScore) {
                if (!newProgress[courseId]) {
                    newProgress[courseId] = { completedLessonIds: new Set(), completedModuleIds: new Set() };
                }
                newProgress[courseId].completedModuleIds.add(moduleId);
                addToast(`Selamat! Anda lulus kuis dengan skor ${percentage}%.`, 'success');
            } else {
                 addToast(`Skor Anda ${percentage}%. Coba lagi untuk melanjutkan.`, 'error');
            }

            return { ...prev, quizScores: newQuizScores, courseProgress: newProgress };
        });
    };
    
    // --- Member Management ---
    const addMember = (memberData: Omit<User, 'id' | 'joined'>) => {
        const newUser: User = {
            ...memberData,
            id: `user-${Date.now()}`,
            joined: new Date().toISOString().split('T')[0],
        };
        setMembers(prev => [...prev, newUser]);
        addToast(`Member baru "${memberData.name}" berhasil ditambahkan.`, 'success');
    };
    const updateMember = (memberId: string, updatedData: Partial<Omit<User, 'id' | 'joined'>>) => {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, ...updatedData } : m));
        addToast('Data member berhasil diperbarui.', 'info');
    };
    const deleteMember = (memberId: string) => {
        setMembers(prev => prev.filter(m => m.id !== memberId));
        addToast('Member berhasil dihapus.', 'success');
    };

    // --- Event Management ---
    const addEvent = (event: CalendarEvent) => {
        setUpcomingEvents(prev => [...prev, event].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        addToast('Event baru berhasil ditambahkan.', 'success');
    };
    const deleteEvent = (eventId: number) => {
        setUpcomingEvents(prev => prev.filter(e => e.id !== eventId));
        addToast('Event berhasil dihapus.', 'success');
    };

    // --- Economic Calendar Management ---
    const addEconomicEvent = (eventData: Omit<EconomicCalendarEvent, 'id'>) => {
        const newEvent = { ...eventData, id: Date.now() };
        setEconomicEvents(prev => [...prev, newEvent]);
         addToast(`Event ekonomi "${eventData.event}" ditambahkan.`, 'success');
    };
    const updateEconomicEvent = (eventId: number, updatedData: Partial<Omit<EconomicCalendarEvent, 'id'>>) => {
        setEconomicEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...updatedData } : e));
        addToast('Event ekonomi berhasil diperbarui.', 'info');
    };
    const deleteEconomicEvent = (eventId: number) => {
        setEconomicEvents(prev => prev.filter(e => e.id !== eventId));
        addToast('Event ekonomi berhasil dihapus.', 'success');
    };
    
    // --- Tools Management ---
    const toggleTool = (toolId: string) => {
        setTools(prev => prev.map(t => t.id === toolId ? { ...t, enabled: !t.enabled } : t));
    };


    const value: PlatformContextType = {
        courses, addCourse, updateCourse, deleteCourse,
        addModule, updateModule, deleteModule,
        addLesson, updateLesson, deleteLesson,
        upcomingEvents, pastEvents, addEvent, deleteEvent,
        economicEvents, addEconomicEvent, updateEconomicEvent, deleteEconomicEvent,
        tools, toggleTool,
        memberProfile, submitQuiz, completeLesson,
        members, addMember, updateMember, deleteMember,
    };

    return (
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
};

export const usePlatform = () => {
    const context = useContext(PlatformContext);
    if (context === undefined) {
        throw new Error('usePlatform must be used within a PlatformProvider');
    }
    return context;
};