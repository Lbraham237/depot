import { Student, Course, ScheduleItem, Grade, Message } from '../types';

export const sampleStudents: Student[] = [
  {
    id: '1',
    firstName: 'Thomas',
    lastName: 'Dubois',
    email: 'thomas.dubois@example.com',
    dateOfBirth: '2005-03-15',
    grade: 'Terminale',
    parentEmail: 'parent.dubois@example.com',
    parentPhone: '0612345678',
    address: '15 Rue de Paris, 75001 Paris',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '2',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@example.com',
    dateOfBirth: '2006-07-22',
    grade: 'Première',
    parentEmail: 'parent.martin@example.com',
    parentPhone: '0623456789',
    address: '8 Avenue Victor Hugo, 75016 Paris',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '3',
    firstName: 'Lucas',
    lastName: 'Bernard',
    email: 'lucas.bernard@example.com',
    dateOfBirth: '2005-11-10',
    grade: 'Terminale',
    parentEmail: 'parent.bernard@example.com',
    parentPhone: '0634567890',
    address: '25 Boulevard Saint-Michel, 75005 Paris',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '4',
    firstName: 'Emma',
    lastName: 'Petit',
    email: 'emma.petit@example.com',
    dateOfBirth: '2006-05-03',
    grade: 'Première',
    parentEmail: 'parent.petit@example.com',
    parentPhone: '0645678901',
    address: '42 Rue de Rivoli, 75004 Paris',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '5',
    firstName: 'Hugo',
    lastName: 'Leroy',
    email: 'hugo.leroy@example.com',
    dateOfBirth: '2005-09-18',
    grade: 'Terminale',
    parentEmail: 'parent.leroy@example.com',
    parentPhone: '0656789012',
    address: '10 Rue de Vaugirard, 75006 Paris',
    enrollmentDate: '2023-09-01'
  }
];

export const sampleCourses: Course[] = [
  {
    id: '1',
    name: 'Mathématiques',
    code: 'MATH-101',
    description: 'Cours de mathématiques avancées pour les élèves de Terminale',
    teacher: 'Dr. Marie Lambert',
    credits: 5,
    semester: 'Premier semestre'
  },
  {
    id: '2',
    name: 'Physique',
    code: 'PHYS-101',
    description: 'Introduction aux principes fondamentaux de la physique',
    teacher: 'Prof. Jean Dupont',
    credits: 4,
    semester: 'Premier semestre'
  },
  {
    id: '3',
    name: 'Littérature Française',
    code: 'LIT-101',
    description: 'Étude des grands auteurs de la littérature française',
    teacher: 'Mme. Claire Moreau',
    credits: 3,
    semester: 'Premier semestre'
  },
  {
    id: '4',
    name: 'Histoire-Géographie',
    code: 'HIST-101',
    description: 'Histoire moderne et géographie mondiale',
    teacher: 'M. Pierre Lefebvre',
    credits: 3,
    semester: 'Premier semestre'
  },
  {
    id: '5',
    name: 'Anglais',
    code: 'ANG-101',
    description: 'Cours d\'anglais avancé avec focus sur la communication',
    teacher: 'Mme. Sarah Johnson',
    credits: 3,
    semester: 'Premier semestre'
  }
];

export const sampleSchedule: ScheduleItem[] = [
  {
    id: '1',
    courseId: '1',
    dayOfWeek: 'Lundi',
    startTime: '08:00',
    endTime: '10:00',
    room: 'Salle 101'
  },
  {
    id: '2',
    courseId: '2',
    dayOfWeek: 'Lundi',
    startTime: '10:15',
    endTime: '12:15',
    room: 'Salle 203'
  },
  {
    id: '3',
    courseId: '3',
    dayOfWeek: 'Mardi',
    startTime: '08:00',
    endTime: '10:00',
    room: 'Salle 105'
  },
  {
    id: '4',
    courseId: '4',
    dayOfWeek: 'Mercredi',
    startTime: '13:00',
    endTime: '15:00',
    room: 'Salle 302'
  },
  {
    id: '5',
    courseId: '5',
    dayOfWeek: 'Jeudi',
    startTime: '10:15',
    endTime: '12:15',
    room: 'Salle 201'
  }
];

export const sampleGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    type: 'Examen',
    score: 85,
    maxScore: 100,
    date: '2023-10-15',
    comment: 'Excellent travail sur les équations différentielles'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '2',
    type: 'Contrôle',
    score: 78,
    maxScore: 100,
    date: '2023-10-10',
    comment: 'Bonne compréhension des lois de Newton'
  },
  {
    id: '3',
    studentId: '2',
    courseId: '3',
    type: 'Dissertation',
    score: 92,
    maxScore: 100,
    date: '2023-10-20',
    comment: 'Analyse très pertinente des œuvres de Molière'
  },
  {
    id: '4',
    studentId: '3',
    courseId: '4',
    type: 'Présentation',
    score: 88,
    maxScore: 100,
    date: '2023-10-25',
    comment: 'Excellente présentation sur la Révolution française'
  },
  {
    id: '5',
    studentId: '4',
    courseId: '5',
    type: 'Oral',
    score: 90,
    maxScore: 100,
    date: '2023-10-18',
    comment: 'Très bonne fluidité en expression orale'
  }
];

export const sampleMessages: Message[] = [
  {
    id: '1',
    studentId: '1',
    sender: 'parent',
    subject: 'Absence prévue',
    content: 'Bonjour, je vous informe que Thomas sera absent le 15 novembre pour un rendez-vous médical. Cordialement, M. Dubois',
    date: '2023-11-10',
    read: true
  },
  {
    id: '2',
    studentId: '2',
    sender: 'teacher',
    subject: 'Progrès en mathématiques',
    content: 'Chers parents, je tenais à vous informer des excellents progrès de Sophie en mathématiques ce trimestre. Cordialement, Dr. Lambert',
    date: '2023-11-05',
    read: true
  },
  {
    id: '3',
    studentId: '3',
    sender: 'parent',
    subject: 'Question sur le devoir',
    content: 'Bonjour, Lucas a des difficultés avec le devoir de physique. Pourriez-vous lui donner des indications supplémentaires ? Merci, Mme Bernard',
    date: '2023-11-08',
    read: false
  },
  {
    id: '4',
    studentId: '4',
    sender: 'teacher',
    subject: 'Comportement en classe',
    content: 'Chers parents, je souhaite vous rencontrer pour discuter du comportement d\'Emma en classe. Pourriez-vous prendre rendez-vous ? Cordialement, M. Lefebvre',
    date: '2023-11-12',
    read: false
  },
  {
    id: '5',
    studentId: '5',
    sender: 'parent',
    subject: 'Remerciements',
    content: 'Bonjour, nous tenons à vous remercier pour votre soutien envers Hugo. Ses résultats se sont nettement améliorés. Cordialement, M. et Mme Leroy',
    date: '2023-11-07',
    read: true
  }
];