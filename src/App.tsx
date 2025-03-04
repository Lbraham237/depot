import React, { useState } from 'react';
import { 
  School, 
  Users, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  MessageSquare,
  Home,
  LogOut
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Courses from './components/Courses';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import Communication from './components/Communication';
import { Student, Course, ScheduleItem, Grade, Message } from './types';
import { sampleStudents, sampleCourses, sampleSchedule, sampleGrades, sampleMessages } from './data/sampleData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(sampleSchedule);
  const [grades, setGrades] = useState<Grade[]>(sampleGrades);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          studentCount={students.length} 
          courseCount={courses.length} 
          scheduleCount={scheduleItems.length} 
          messageCount={messages.length} 
        />;
      case 'students':
        return <Students students={students} setStudents={setStudents} />;
      case 'courses':
        return <Courses courses={courses} setCourses={setCourses} />;
      case 'schedule':
        return <Schedule 
          scheduleItems={scheduleItems} 
          setScheduleItems={setScheduleItems} 
          courses={courses}
        />;
      case 'grades':
        return <Grades 
          grades={grades} 
          setGrades={setGrades} 
          students={students} 
          courses={courses} 
        />;
      case 'communication':
        return <Communication 
          messages={messages} 
          setMessages={setMessages} 
          students={students} 
        />;
      default:
        return <Dashboard 
          studentCount={students.length} 
          courseCount={courses.length} 
          scheduleCount={scheduleItems.length} 
          messageCount={messages.length} 
        />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-4 flex items-center space-x-2">
          <School className="h-8 w-8" />
          <h1 className="text-xl font-bold">EduManager</h1>
        </div>
        <nav className="mt-8">
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="h-5 w-5" />
            <span>Tableau de bord</span>
          </div>
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'students' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('students')}
          >
            <Users className="h-5 w-5" />
            <span>Étudiants</span>
          </div>
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'courses' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('courses')}
          >
            <BookOpen className="h-5 w-5" />
            <span>Cours</span>
          </div>
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'schedule' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar className="h-5 w-5" />
            <span>Emploi du temps</span>
          </div>
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'grades' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('grades')}
          >
            <GraduationCap className="h-5 w-5" />
            <span>Notes</span>
          </div>
          <div 
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer ${activeTab === 'communication' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
            onClick={() => setActiveTab('communication')}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Communication</span>
          </div>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-indigo-700">
          <div className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-indigo-700">
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'students' && 'Gestion des Étudiants'}
              {activeTab === 'courses' && 'Gestion des Cours'}
              {activeTab === 'schedule' && 'Emploi du temps'}
              {activeTab === 'grades' && 'Suivi des Notes'}
              {activeTab === 'communication' && 'Communication'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;