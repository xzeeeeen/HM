import React, { useState } from 'react';
import { Quiz } from '../../types';
import { Button } from '../Button';
import { usePlatform } from '../../contexts/PlatformContext';
import { CheckCircleIcon, ErrorIcon } from '../icons';

interface QuizViewProps {
    courseId: number;
    quiz: Quiz;
    onComplete: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ courseId, quiz, onComplete }) => {
    const { submitQuiz, memberProfile } = usePlatform();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const handleSelectAnswer = (questionId: number, answer: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        submitQuiz(courseId, quiz.moduleId, quiz.id, selectedAnswers);
        setShowResults(true);
    };

    if (showResults) {
        const score = quiz.questions.reduce((acc, q) => {
            return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
        }, 0);
        
        const totalQuestions = quiz.questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const hasPassed = percentage >= quiz.passingScore;

        return (
            <div className={`bg-brand-secondary/30 border ${hasPassed ? 'border-brand-green/50' : 'border-brand-red/50'} rounded-lg p-8 text-center animate-fade-in-up`}>
                <div className="flex justify-center">
                    {hasPassed ? <CheckCircleIcon className="w-16 h-16 text-brand-green" /> : <ErrorIcon className="w-16 h-16 text-brand-red" />}
                </div>
                <h2 className={`text-3xl font-bold mt-4 ${hasPassed ? 'text-brand-green' : 'text-brand-red'}`}>
                    {hasPassed ? 'Selamat, Anda Lulus!' : 'Coba Lagi'}
                </h2>
                <p className="mt-4 text-5xl font-bold text-white">{percentage}%</p>
                <p className="text-brand-text-secondary mt-2">Anda menjawab {score} dari {totalQuestions} pertanyaan dengan benar.</p>
                <p className="text-brand-text-secondary text-sm">(Skor Lulus: {quiz.passingScore}%)</p>
                <div className="mt-8">
                    <Button onClick={onComplete} className="!w-auto px-8">
                        {hasPassed ? 'Lanjut ke Modul Berikutnya' : 'Kembali & Ulangi Kuis'}
                    </Button>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div className="bg-brand-secondary/30 border border-brand-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
            <p className="text-brand-text-secondary mt-1">Pertanyaan {currentQuestionIndex + 1} dari {quiz.questions.length}</p>
            
            <div className="mt-8 border-t border-brand-border pt-6">
                <p className="text-lg text-white font-semibold">{currentQuestion.question}</p>
                <div className="mt-6 space-y-4">
                    {currentQuestion.options.map(option => (
                        <button 
                            key={option}
                            onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${selectedAnswers[currentQuestion.id] === option ? 'border-brand-accent bg-brand-accent/20 scale-[1.02]' : 'border-brand-border hover:bg-brand-primary/50'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                 <Button 
                    variant="secondary"
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} 
                    disabled={currentQuestionIndex === 0}
                    className="!w-auto"
                >
                    Sebelumnya
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleSubmit} className="!w-auto" disabled={!selectedAnswers[currentQuestion.id]}>
                        Lihat Hasil
                    </Button>
                ) : (
                    <Button 
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)} 
                        disabled={!selectedAnswers[currentQuestion.id]}
                        className="!w-auto"
                    >
                        Selanjutnya
                    </Button>
                )}
            </div>
        </div>
    );
};
