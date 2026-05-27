// src/data/skills.js

export const skills = [
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3', level: 92, category: 'frontend' },
  { name: 'JavaScript', level: 88, category: 'frontend' },
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'Node.js', level: 75, category: 'backend' },
  { name: 'Express.js', level: 78, category: 'backend' },
  { name: 'MongoDB', level: 70, category: 'backend' },
  { name: 'Figma', level: 80, category: 'design' },
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=600&auto=format&fit=crop&q=80',
    description: 'A full-featured e-commerce platform built with React, Node.js, Express, and MongoDB. Includes search filtering, shopping cart, and mock payment gateway.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Fitness Tracker App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1510017808638-a59b57602256?w=600&auto=format&fit=crop&q=80',
    description: 'A cross-platform mobile health tracker allowing users to log exercises, monitor hydration levels, and view sleep analysis dashboards.',
    tags: ['React Native', 'Firebase', 'ChartJS'],
  },
  {
    id: 3,
    title: 'Executive Admin Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    description: 'Interactive analytics dashboard designed for monitoring SaaS metrics, user activities, server health statuses, and monthly revenue metrics.',
    tags: ['React', 'Recharts', 'TailwindCSS'],
  },
  {
    id: 4,
    title: 'Modern Portfolio Mockup',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    description: 'A dark-mode high-fidelity portfolio concept built in Figma, using a 12-column grid and modern glassmorphism design styles.',
    tags: ['Figma', 'UI/UX', 'Glassmorphism'],
  },
];
