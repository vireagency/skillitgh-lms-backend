const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SkillitGH LMS API",
      version: "1.0.0",
      description: "A learning management system API built with Node.js, Express, and MongoDB. It allows users to register for courses and workshops enrolment. Users can also view registered courses and workshops, view past and upcoming workshops."
    },
    contact: {
      name: "Emmanuel Sakyi",
      title: "Software Backend Engineer",
      url: "www.github.com/sakyi-ken",
      email: "sakyiken7@gmail.com",
    },
    license: {
      name: "MIT License",
      url: "https://github.com/Sakyi-Ken/skillitgh-lms-backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://skillitgh-lms.onrender.com",
        description: "Live server"
      }
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Users",
        description: "User management",
      },
      {
        name: "Courses",
        description: "Course management",
      },
      {
        name: "Workshops",
        description: "Workshop management",
      },
      {
        name: "Auth",
        description: "Authentication and authorization",
      },
      {
        name: "Dashboard",
        description: "Dashboard management",
      }
    ],
  },
  apis: ['src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;