const db = require("./dbConnection.js");
const util = require("util");
const inquirer = require("inquirer");

// ********************************** View All Departments ***************************************
departments = () => {
  clear();
  db.query("select id, name from department", function (err, results) {
    err ? console.log(err) : console.table(results), Options();
    //   let result = console.table(results);
    //   console.log(`
    //   `);
    //   return Options();
  });
};

// ************************************ View all Roles ***********************************************
roles = () => {
  clear();
  db.query(
    `SELECT 
        role.id,
        title, 
        salary, 
        department.name as department
    FROM role
    JOIN department ON role.department_id = department.id`,
    function (err, results) {
      err ? console.log(err) : console.table(results), Options();
    }
  );
};

// ************************************* View All Employees ******************************************
employees = () => {
  clear();
  db.query(
    `SELECT 
        employee.id,
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role on employee.role_id = role.id 
        LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;
        `,
    function (err, results) {
      err ? console.log(err) : console.table(results), Options();
    }
  );
};

// ******************************** ADD Department ***********************************
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "Department name: ",
        validate: (addDept) => {
          if (!addDept) {
            console.log("Please enter a department!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        `
        INSERT INTO department (name) 
        VALUE ('${answer.addDept}')
        `,
        function (err, results) {
          err
            ? console.log(err)
            : console.log(`You have added ${answer.addDept} to departments`),
            Options();
        }
      );
    });
};

// ************************************ Add Role ***************************************
addRole = () => {
  const getDepartments = [];
  db.query("SELECT id,name FROM department", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      getDepartments.push(res[i]);
    }
    console.log(getDepartments);
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter title of new role: ",
        validate: (title) => {
          if (!title) {
            console.log("Please enter title for new role: ");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary: ",
        validate: (salary) => {
          if (!salary) {
            console.log("Please enter a salary amount: ");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        name: "pickDept",
        message: "Choose a department",
        choices: getDepartments,
      },
    ])
    .then((answer) => {
      let title = answer.title;
      let salary = answer.salary;
      let newId = answer.pickDept;
      for (let i = 0; i < getDepartments.length; i++) {
        if (newId === getDepartments[i].name) {
          newId = getDepartments[i].id;
        }
      }

      db.query(
        `
        INSERT INTO role(title, salary, department_id)
        VALUE ("${title}", "${salary}",${newId})
        `,
        function (err, results) {
          err
            ? console.log(err)
            : console.log(`You have added ${title} to roles`),
            Options();
        }
      );
    });
};

// ************************************* Add Employee ***********************************
addEmployee = () => {
  // create arrays for roles and managers
  const getRole = [];
  const getTitle = [];
  db.query("SELECT id,title from role", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      getRole.push(res[i]);
      getTitle.push(res[i].title);
    }
    console.log(getRole);
    console.log(getTitle);
  });

  const getManager = [];
  const getManageId = [];
  db.query("SELECT id,first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      getManager.push(`${res[i].first_name} ${res[i].last_name}`);
      getManageId.push(res[i]);
    }

    console.log(getManager);
    console.log(getManageId);
  });

  // Questions
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter First Name: ",
        validate: (firstName) => {
          if (!firstName) {
            console.log("Please enter first name! ");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter Last Name: ",
        validate: (lastName) => {
          if (!lastName) {
            console.log("Please enter last name!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Enter Role: ",
        choices: getTitle,
      },
      {
        type: "list",
        name: "manager",
        message: "Choose a manager",
        choices: getManager,
      },
    ])
    .then((answer) => {
      let role = "";
      for (let i = 0; i < getRole.length; i++) {
        if (answer.role === getRole[i].title) {
          role = getRole[i].id;
        }
      }
      for (let i = 0; i < getManager.length; i++) {
        if (answer.manager === getManager[i]) {
          answer.manager = getManageId[i].id;
        }
      }
      db.query(
        `
      INSERT INTO employee(first_name, last_name, role_id, manager_id)
      VALUE ("${answer.firstName}", "${answer.lastName}",${role},${answer.manager})
      `,
        function (err, results) {
          err
            ? console.log(err)
            : console.log(
                `You have added ${answer.firstName} ${answer.lastName} to employees`
              ),
            Options();
        }
      );
    });
};

// ****************************** Update Employee Role **************************
updateEmployeeRole = async () => {
  // variable and array for employees

  const getEmployees = [];

  db.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      getEmployees.push(`${res[i].first_name} ${res[i].last_name}`);
    }
    // console.log(getEmployees);
  });

  // variable and array for roles
  const roles = [];

  db.query("SELECT title from role", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roles.push(res[i].title);
    }
    // console.log(roles);
  });

  // questions
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        choices: getEmployees,
      },
      {
        type: "list",
        name: "newRole",
        message: "Select a new Role: ",
        choices: roles,
      },
    ])
    .then((answer) => {
      console.log("worked");
      //     db.query(
      //       `
      // // UPDATE employee
      // // SET an
      // `
      //     );
    });
};

// ***************** Clear command line screen and show logo and run *********************
clear = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  showLogo();
};

// ***************************************** exports **************************************
module.exports = {
  departments,
  roles,
  addRole,
  employees,
  addDepartment,
  addEmployee,
  updateEmployeeRole,
};
