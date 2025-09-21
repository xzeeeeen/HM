// types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  joined: string; // YYYY-MM-DD format
  status: 'Active' | 'Banned';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass:string) => Promise<void>;
  register: (name: string, email: string, pass:string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface Quiz {
    id: number;
    moduleId: number; // Link back to the module
    title: string;
    questions: QuizQuestion[];
    passingScore: number; // e.g., 80 for 80%
}

export interface Lesson {
  id: number;
  title: string;
  content: string; // Could be markdown or HTML
  videoUrl?: string; // For video content
}

export interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
    quiz: Quiz;
}

export type CourseCategory = 'Trading Forex' | 'Cryptocurrency' | 'Bisnis';

export interface Course {
  id: number;
  title:string;
  category: CourseCategory;
  description: string;
  modules: Module[];
  status: 'Published' | 'Draft';
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  link: string;
}

export interface EconomicCalendarEvent {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  currency: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  actual: string | null;
  forecast: string;
  previous: string;
}

export interface TradingTool {
  id: string;
  name: string;
  enabled: boolean;
}

// Represents the progress of a single user
export interface CourseProgress {
    [courseId: number]: {
        completedLessonIds: Set<number>;
        completedModuleIds: Set<number>; // Track completed modules
    };
}

export interface MemberProfile {
    userId: string;
    points: number;
    level: string;
    courseProgress: CourseProgress;
    quizScores: { [quizId: number]: number }; // To store the highest score for each quiz
}

// FIX: This type was defined in PlatformContext but is needed for the extended event interface.
// Moving it here makes it globally accessible and consistent.
export interface PlatformContextType {
    courses: Course[];
    addCourse: (course: Omit<Course, 'id' | 'modules'>) => void;
    updateCourse: (courseId: number, updatedData: Partial<Course>) => void;
    deleteCourse: (courseId: number) => void;
    
    addModule: (courseId: number, module: Omit<Module, 'id' | 'lessons' | 'quiz'>) => void;
    updateModule: (courseId: number, moduleId: number, updatedData: Partial<Module>) => void;
    deleteModule: (courseId: number, moduleId: number) => void;

    addLesson: (courseId: number, moduleId: number, lesson: Omit<Lesson, 'id'>) => void;
    updateLesson: (courseId: number, moduleId: number, lessonId: number, updatedData: Partial<Lesson>) => void;
    deleteLesson: (courseId: number, moduleId: number, lessonId: number) => void;
    
    upcomingEvents: CalendarEvent[];
    pastEvents: CalendarEvent[];
    addEvent: (event: CalendarEvent) => void;
    deleteEvent: (eventId: number) => void;
    
    economicEvents: EconomicCalendarEvent[];
    addEconomicEvent: (eventData: Omit<EconomicCalendarEvent, 'id'>) => void;
    updateEconomicEvent: (eventId: number, updatedData: Partial<Omit<EconomicCalendarEvent, 'id'>>) => void;
    deleteEconomicEvent: (eventId: number) => void;

    tools: TradingTool[];
    toggleTool: (toolId: string) => void;
    
    memberProfile: MemberProfile;
    submitQuiz: (courseId: number, moduleId: number, quizId: number, answers: { [key: number]: string }) => void;
    completeLesson: (courseId: number, lessonId: number) => void;

    members: User[];
    addMember: (memberData: Omit<User, 'id' | 'joined'>) => void;
    updateMember: (memberId: string, updatedData: Partial<Omit<User, 'id' | 'joined'>>) => void;
    deleteMember: (memberId: string) => void;
}