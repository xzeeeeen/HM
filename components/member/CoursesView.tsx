import React, { useState } from 'react';
import { usePlatform } from '../../contexts/PlatformContext';
import { Course } from '../../types';
import { CourseDetailView } from './CourseDetailView';
import { EducationHome } from './EducationHome';

export const CoursesView: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { courses } = usePlatform();

    if (selectedCourse) {
        return <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return <EducationHome courses={courses} onSelectCourse={setSelectedCourse} />;
};
