const Course = require('../models/course.model');
const CourseRegistration = require('../models/course.registration');
const { connectDB } = require('../../config/db');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const seedCourses = async () => {
  try {
    connectDB();

    // Clear existing data
    await Course.deleteMany();
    await CourseRegistration.deleteMany();

    const Courses = [
      {
        title: 'Graphic Design',
        description: 'Learn the fundamentals of graphic design and typography.',
      },
      {
        title: 'Web Development',
        description: 'Build responsive websites using HTML, CSS, and JavaScript.',
      },
      {
        title: 'Microsoft Office',
        description: 'Master Excel, Word, and PowerPoint for productivity.',
      },
      {
        title: 'UI/UX Design',
        description: 'Understand user experience and interface design principles.',
      },
    ];
    
    const CourseRegistrations = [
      {
        text: 'Looking forward to this course!',
      },
      {
        text: 'Excited to learn web development!',
      },
      {
        text: 'Can\'t wait to dive into data science!',
      },
      {
        text: 'Eager to learn about design principles!', 
      },
    ];

    const hashedPassword = await bcrypt.hash("Keys1339", 10);

    const users = [
      { firstName: "Samuel", 
        lastName: "Young",
        email: "sammy34@gmail.com",
        password: hashedPassword,
      },
      { firstName: "Martha", 
        lastName: "Smith",
        email: "martha43@gmail.com",
        password: hashedPassword
      },
      { firstName: "HonK", 
        lastName: "Kim",
        email: "kimmy55@gmail.com",
        password: hashedPassword
      },
      {
        firstName: "Isaac",
        lastName: "Anim",
        email: "Isaan32@gmail.com",
        password: hashedPassword
      }
    ]
    const insertedUsers = await User.insertMany(users);
    console.log('Users seeded:', insertedUsers);

    // Insert new courses
    const insertedCourses = await Course.insertMany(Courses);
    console.log('Courses seeded:', insertedCourses);

    // Insert course registrations
    const courseRegistrations = Courses.map((course, index) => ({
      course: insertedCourses[index]._id,
      enrolledUser: insertedUsers[index]._id,
      text: CourseRegistrations[index].text,
    }));
    
    const insertedRegistrations = await CourseRegistration.insertMany(courseRegistrations);
    console.log('Course registrations seeded:', insertedRegistrations);

  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    process.exit(0);
  }
}
seedCourses();
module.exports = seedCourses;

// ALT 

// async function seedData() {
//   try {
//     // Clear existing data
//     await Course.deleteMany();
//     await User.deleteMany();
//     await CourseRegistration.deleteMany();

//     // Create sample users
//     const hashedPassword = await bcrypt.hash("password123", 10);

//     const users = await User.insertMany([
//       {
//         name: "John Doe",
//         email: "john@example.com",
//         password: hashedPassword
//       },
//       {
//         name: "Jane Smith",
//         email: "jane@example.com",
//         password: hashedPassword
//       }
//     ]);

//     // Create sample courses
//     const courses = await Course.insertMany([
//       { title: "Intro to Web Development", description: "Learn HTML, CSS, JavaScript" },
//       { title: "Backend with Node.js", description: "Learn Express, MongoDB" },
//       { title: "UI/UX Fundamentals", description: "Design principles and Figma" }
//     ]);

//     // Register users for courses
//     await CourseRegistration.insertMany([
//       {
//         user: users[0]._id,
//         course: courses[0]._id,
//         message: "I want to start learning frontend development"
//       },
//       {
//         user: users[1]._id,
//         course: courses[1]._id,
//         message: "I'm interested in building backend APIs"
//       },
//       {
//         user: users[0]._id,
//         course: courses[2]._id,
//         message: "Interested in design and prototyping"
//       }
//     ]);

//     console.log("✅ Seeding complete!");
//     process.exit();

//   } catch (error) {
//     console.error("❌ Seeding error:", error);
//     process.exit(1);
//   }
// }