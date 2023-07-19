const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");

cfonts.say(
  `
-----------------
|    Employee   |
|    Manager    |
-----------------`,
  {
    font: "tiny",
    lineHeight: 1,
    space: false,
  }
);

const mainQuestions = [
  {
    type: "list",
    name: "options",
    message: "Choose an option:",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add and employee",
      "Update an employee role",
    ],
  },
];

inquirer.prompt(mainQuestions).then((answer) => {
  console.log(answer.options);
});
