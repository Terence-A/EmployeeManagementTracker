// get node mudules, dependencies and packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");

const db = mysql.createConnection({
  hose: "localhost",
  user: "root",
  passowrd: "password",
});

// heading, ascii cfonts for styling header
cfonts.say(
  `
 -------------
  Employee
  Manager
 -------------
`,
  {
    font: "tiny",
    lineHeight: 1,
    space: false,
  }
);

// Main questions
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
  if (answer.options === "View all departments") {
    departments();
  }
});

departments = () => {
  console.log(departments);
};
