// get node mudules, dependencies and packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");
const db = require("./utilities/dbConnection.js");
const showLogo = require("./utilities/logo.js");
const opt = require("./utilities/promptOptions.js");

// heading, ascii cfonts for styling header

showLogo();

// Main questions
Options = () => {
  const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employeeTracker_db",
    },
    console.log("Connected to employeeTracker_db database")
  );

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
          "Clear screen",
          "Exit",
        ],
      },
    ])

    .then((answer) => {
      console.log("answer");
      if (answer.options === "View all departments") {
        opt.departments();
      } else if (answer.options === "View all roles") {
        opt.roles();
      } else if (answer.options === "View all employees") {
        opt.employees();
      } else if (answer.options === "Clear screen") {
        opt.clear();
      }
    });
};

Options();
