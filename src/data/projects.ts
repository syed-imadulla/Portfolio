export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'studyflow-ai',
    number: '01',
    title: 'STUDYFLOW AI',
    subtitle: 'AI-Powered Student Productivity Platform',
    description: 'AI-powered student productivity platform built to streamline task management, study planning, focus sessions, and productivity tracking.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    github: 'https://github.com/syed-imadulla/SudyFlow-Ai',
    featured: true,
  },
  {
    id: 'smart-library',
    number: '02',
    title: 'SMART LIBRARY BOOK TRACKER',
    subtitle: 'Full-Stack Library Management System',
    description: 'Full-stack library management system for book inventory and tracking, with a C++ backend and responsive web dashboard.',
    technologies: ['C++', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/syed-imadulla/Smart_Library_Book_Tracker',
    featured: false,
  },
  {
    id: 'minis',
    number: '03',
    title: 'MINIS',
    subtitle: 'Mini Projects / Creative Frontend Experiments',
    description: 'Small interactive web experiments and creative mini-applications exploring frontend interactions, state management, drag-and-drop, animations and playful hidden interactions.',
    technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    github: 'https://github.com/syed-imadulla/Minis',
    live: 'https://minisx.netlify.app/',
    featured: false,
  }
];
