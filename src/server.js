const figlet = require('figlet');
const app = require('./app');

app.listen(process.env.PORT || 5000, () => {
  console.log(figlet.textSync("SkillitGH-LMS", {
    font: 'Slide',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  }));
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
});