// get node mudules, dependencies and packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  //   database: "employeeTracker_db",
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
Options = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Choose an option:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])

    .then((answer) => {
      console.log("answer");
      //   if (answer.options === "View all departments") {
      //     departments();
      //   }
    });
};

// departments = () => {
//   console.log(departments);
// };

// roles = () => {
//   console.log(roles);
// };

Options();
