const Workshop = require('../models/workshop.model');
const { connectDB } = require('../../config/db');

const seedWorkshops = async () => {
  try {
    connectDB();

    await Workshop.deleteMany(); // Clear existing

    const today = new Date();

    const workshops = [
      {
        title: 'Frontend Fundamentals',
        description: 'HTML, CSS, JavaScript basics for beginners.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15), // 3 days from now
        duration: '2 hours',
        facilitator: {
          name: 'Ama Serwah',
          email: 'amase55@gmail.com',
        },
        resources: [],
        location: 'KNUST, Kumasi'
      },
      {
        title: 'Graphic Designing Bootcamp',
        description: 'Node.js, Express.js and MongoDB hands-on.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12), // 2 days ago
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
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 17), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Nana Gyamfi',
          email: 'NanaGee47@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      },
      {
        title: 'Machine Learning Basics',
        description: 'Introduction to machine learning and data science.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 27), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Nana Gyamfi',
          email: 'NanaGee47@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      },
      {
        title: 'Introduction to Artificial Intelligence',
        description: 'Understanding AI concepts and applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Nana Gyamfi',
          email: 'NanaGee47@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      },
      {
        title: 'Cybersecurity Essentials',
        description: 'Basics of cybersecurity and data protection.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Asamoah Gyan',
          email: 'paressa@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra', 
      },
      {
        title: 'Cloud Computing Fundamentals',
        description: 'Introduction to cloud services and deployment.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Dr. Akoto Mensah',
          email: 'paieio@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      },
      {
        title: 'Data Science and Analytics',
        description: 'Understanding data analysis and visualization.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 25), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'iddakapi@gmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Blockchain Technology',
        description: 'Understanding blockchain and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Dr. Akoto Mensah',
          email: 'adkak@gmail.com',
        },
        resources: [],
        location: 'Praisel House, Accra',
      },
      {
        title: 'Mobile App Development',
        description: 'Building mobile applications using Flutter.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 35), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'adkai@gmail.com',
        }, 
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'UI/UX Design Principles',
        description: 'Understanding user interface and experience design.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 40), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'uiuip@gmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Agile Project Management',
        description: 'Understanding Agile methodologies and practices.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 45), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Digital Marketing Strategies',
        description: 'Understanding digital marketing and SEO.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 50), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Data Visualization Techniques',
        description: 'Understanding data visualization tools and techniques.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 55), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Quantum Computing',
        description: 'Understanding the basics of quantum computing.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Ethical Hacking Basics',
        description: 'Understanding ethical hacking and penetration testing.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 65), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Augmented Reality',
        description: 'Understanding augmented reality and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 70), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Virtual Reality',
        description: 'Understanding virtual reality and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 75), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Internet of Things (IoT)',
        description: 'Understanding IoT and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 80), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Robotics',
        description: 'Understanding robotics and automation.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 85), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to 3D Printing',
        description: 'Understanding 3D printing and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Game Development',
        description: 'Understanding game development and design principles.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 95), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Natural Language Processing',
        description: 'Understanding NLP and its applications.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 100), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Computer Vision',
        description: 'Understanding computer vision and image processing.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 105), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Mining',
        description: 'Understanding data mining techniques and tools.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 110), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Warehousing',
        description: 'Understanding data warehousing concepts and tools.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 115), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Big Data',
        description: 'Understanding big data technologies and tools.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 120), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Governance',
        description: 'Understanding data governance and management.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 125), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Ethics',
        description: 'Understanding data ethics and privacy.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 130), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Storytelling',
        description: 'Understanding data storytelling techniques and tools.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 135), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Visualization Tools',
        description: 'Understanding data visualization tools and techniques.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 140), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Analysis Tools',
        description: 'Understanding data analysis tools and techniques.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 145), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Science Tools',
        description: 'Understanding data science tools and techniques.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 150), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Science Techniques',
        description: 'Understanding data science techniques and tools.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 155), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
      {
        title: 'Introduction to Data Science Applications',
        description: 'Understanding data science applications and use cases.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 160), // 7 days from now
        duration: '3 hours',
        facilitator: {
          name: 'Prof. Akpati Iddris',
          email: 'yourmail.com',
        },
        resources: [],
        location: 'University of Ghana, Legon',
      },
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