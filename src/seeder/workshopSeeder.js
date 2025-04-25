const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workshop = require('../models/workshop.model');
const { connectDB } = require('../config/db');

const seedWorkshops = async () => {
  try {
    connectDB();

    await Workshop.deleteMany(); // Clear existing

    const today = new Date();

    const workshops = [
      {
        title: 'Frontend Fundamentals',
        description: 'HTML, CSS, JavaScript basics for beginners.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), // 3 days from now
        duration: '2 hours',
        facilitator: {
          name: 'Ama Serwah',
          email: 'amase55@gmail.com',
        },
        resources: [],
        location: 'KNUST, Kumasi'
      },
      {
        title: 'Backend Bootcamp',
        description: 'Node.js, Express.js and MongoDB hands-on.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), // 2 days ago
        duration: '2 hours',
        facilitator: {
          name: 'William Ofosu',
          email: 'pwilli35@gmail.com',
        },
        resources: ['https://example.com/backend-video', 'https://example.com/slides.pdf'],
        location: 'UGBS, Legon',
      },
      {
        title: 'DevOps Crash Course',
        description: 'Docker, CI/CD and cloud deployment strategies.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Nana Gyamfi',
          email: 'NanaGee47@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      }
    ];

    await Workshop.insertMany(workshops);

    console.log('✅ Workshops seeded!');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to seed workshops:', err);
    process.exit(1);
  }
};

seedWorkshops();