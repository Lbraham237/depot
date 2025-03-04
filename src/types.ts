<<<<<<< HEAD
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  grade: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  enrollmentDate: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacher: string;
  credits: number;
  semester: string;
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  type: string; // 'exam', 'quiz', 'homework', etc.
  score: number;
  maxScore: number;
  date: string;
  comment?: string;
}

export interface Message {
  id: string;
  studentId: string;
  sender: string; // 'teacher' or 'parent'
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export interface DashboardStats {
  studentCount: number;
  courseCount: number;
  scheduleCount: number;
  messageCount: number;
=======
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  experience: number;
  skills: string[];
  jobBoard: string;
  resumeUrl: string;
  score: number;
}

export interface SearchCriteria {
  skills: string[];
  experience: number;
  location: string;
  immediateAvailability: boolean;
  jobBoards: string[];
>>>>>>> 4997ab40ec1b39026e315829acfc5c89097e9e7f
}