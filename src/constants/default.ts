import { PostCategory, Post, ProjectCategory, Project } from "../types/default";

export const post_cat: PostCategory[] = [
  { id: 0, title: "All" },
  { id: 1, title: "Tech" },
  { id: 2, title: "Development" },
  { id: 3, title: "Design" },
  { id: 4, title: "Tutorials" },
];
export const posts: Post[] = [
  {
    id: 1,
    title: "Introduction to Software Engineering",
    content:
      "Software engineering is the systematic application of engineering approaches to the development of software. Learn the fundamentals and best practices.",
    category: "Development",
    author: "John Doe",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Mastering Frontend Development with React",
    content:
      "Frontend development has evolved significantly with frameworks like React. Discover how to build dynamic and responsive user interfaces.",
    category: "Development",
    author: "Jane Smith",
    date: "2023-09-25",
  },
  {
    id: 3,
    title: "Backend Development: Building Scalable APIs",
    content:
      "Backend development is the backbone of any application. Learn how to design and implement scalable APIs using Node.js and Express.",
    category: "Development",
    author: "Alice Johnson",
    date: "2023-09-18",
  },
  {
    id: 4,
    title: "Full Stack Development: Bridging Frontend and Backend",
    content:
      "Full stack development combines frontend and backend skills. Explore tools and frameworks to become a proficient full stack developer.",
    category: "Development",
    author: "Bob Brown",
    date: "2023-09-10",
  },
  {
    id: 5,
    title: "Agile Methodology in Software Development",
    content:
      "Agile methodology has revolutionized software development. Understand its principles and how to implement them in your projects.",
    category: "Tech",
    author: "Charlie Davis",
    date: "2023-09-05",
  },
  {
    id: 6,
    title: "Top 10 Tools for Frontend Developers in 2023",
    content:
      "Stay ahead in frontend development with the latest tools and libraries. Here are the top 10 tools every frontend developer should know.",
    category: "Tech",
    author: "Diana Evans",
    date: "2023-08-28",
  },
  {
    id: 7,
    title: "Database Design for Backend Developers",
    content:
      "A well-designed database is crucial for backend systems. Learn the best practices for database design and optimization.",
    category: "Development",
    author: "Ethan Green",
    date: "2023-08-20",
  },
  {
    id: 8,
    title: "The Future of Full Stack Development",
    content:
      "Full stack development is evolving rapidly. Discover emerging trends and technologies shaping the future of full stack development.",
    category: "Tech",
    author: "Fiona Harris",
    date: "2023-08-15",
  },
  {
    id: 9,
    title: "Software Development Life Cycle (SDLC) Explained",
    content:
      "The SDLC is a framework for developing software. Learn about its phases, from planning to deployment and maintenance.",
    category: "Tech",
    author: "George Wilson",
    date: "2023-08-10",
  },
  {
    id: 10,
    title: "Best Practices for Writing Clean Code",
    content:
      "Clean code is essential for maintainable software. Explore best practices for writing clean, readable, and efficient code.",
    category: "Development",
    author: "Hannah Martinez",
    date: "2023-08-05",
  },
  {
    id: 11,
    title: "The Art of UI/UX Design",
    content:
      "UI/UX design is more than just aesthetics. Learn how to create user-friendly and visually appealing interfaces.",
    category: "Design",
    author: "Ivy Lee",
    date: "2023-07-30",
  },
  {
    id: 12,
    title: "Getting Started with Figma for Designers",
    content:
      "Figma is a powerful tool for designers. Discover how to use Figma to create stunning designs and prototypes.",
    category: "Design",
    author: "Jack White",
    date: "2023-07-25",
  },
  {
    id: 13,
    title: "Step-by-Step Guide to Building a REST API",
    content:
      "Learn how to build a REST API from scratch using Node.js, Express, and MongoDB. Perfect for beginners!",
    category: "Tutorials",
    author: "Karen Adams",
    date: "2023-07-20",
  },
  {
    id: 14,
    title: "How to Create Responsive Web Designs",
    content:
      "Responsive design is a must in today's web development. Learn how to create websites that look great on all devices.",
    category: "Tutorials",
    author: "Liam Brown",
    date: "2023-07-15",
  },
  {
    id: 15,
    title: "Top 5 JavaScript Frameworks in 2023",
    content:
      "JavaScript frameworks are essential for modern web development. Here are the top 5 frameworks you should know in 2023.",
    category: "Tech",
    author: "Mia Clark",
    date: "2023-07-10",
  },
];

export const proj_cat:ProjectCategory[] = [
  {id:0, title:"All"}, 
  {id:0, title:"Web"}, 
  {id:0, title:"Graphics"}, 
  {id:0, title:"Game"}, 
  {id:0, title:"Video"}, 
];

export const projects:Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A sleek and modern portfolio website showcasing skills and projects.",
    image: "/project/portfolio.jpg",
    category: "Web",
    live: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Logo Design",
    description: "A creative and minimalistic logo designed for a startup.",
    image: "/project/logo.jpg",
    category: "Graphics",
    live: "#",
    github: "",
  },
  {
    id: 3,
    title: "3D Game Prototype",
    description: "A physics-based 3D game prototype built with Godot Engine.",
    image: "/project/game.jpg",
    category: "Game",
    live: "#",
    github: "#",
  },
  {
    id: 4,
    title: "E-Commerce App",
    description: "A mobile-first e-commerce app for seamless online shopping.",
    image: "/project/ecommerce.jpg",
    category: "Web",
    live: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Product Advertisement",
    description: "A high-quality promotional video for a product launch.",
    image: "/project/video.jpg",
    category: "Video",
    live: "#",
    github: "",
  },
  {
    id: 6,
    title: "Creative Branding",
    description: "A unique branding project that enhanced brand identity.",
    image: "/project/branding.jpg",
    category: "Graphics",
    live: "#",
    github: "#",
  },
  {
    id: 7,
    title: "Modern UI/UX Design",
    description: "A clean and user-friendly interface for a mobile app.",
    image: "/project/uiux.jpg",
    category: "Graphics",
    live: "#",
    github: "#",
  },
  {
    id: 8,
    title: "Game Concept Art",
    description: "Illustrated concept art for a new adventure game.",
    image: "/project/concept-art.jpg",
    category: "Game",
    live: "#",
    github: "#",
  },
  {
    id: 9,
    title: "Tech Conference Promo Video",
    description: "A dynamic promotional video for a tech conference.",
    image: "/project/conference-video.jpg",
    category: "Video",
    live: "#",
    github: "",
  },
];

