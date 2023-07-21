// get node mudules, dependencies and packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");
const db = require("./utilities/dbConnection.js");
const showLogo = require("./utilities/logo.js");

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
        departments();
      } else if (answer.options === "View all roles") {
        roles();
      } else if (answer.options === "View all employees") {
        employees();
      } else if (answer.options === "Clear screen") {
        clear();
      }
    });
};

departments = async () => {
  db.query(
    "select * from department",
    await function (err, results) {
      let result = console.table(results);
      return Options();
    }
  );
};

roles = async () => {
  db.query(
    "select * from role",
    await function (err, results) {
      let result = console.table(results);
      return Options();
    }
  );
};
employees = async () => {
  db.query(
    "select * from employee",
    await function (err, results) {
      let result = console.table(results);
      return Options();
    }
  );
};
clear = async () => {
  await process.stdout.write("\u001b[2J\u001b[0;0H");
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
  Options();
};

Options();
