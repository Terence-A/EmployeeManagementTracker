const db = require("./dbConnection.js");
const util = require("util");

departments = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  showLogo();
  db.query("select id, name from department", function (err, results) {
    err ? console.log(err) : console.table(results), Options();
    //   let result = console.table(results);
    //   console.log(`
    //   `);
    //   return Options();
  });
};

roles = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  showLogo();
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
employees = () => {
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
clear = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  showLogo();
  Options();
};

module.exports = {
  departments,
  roles,
  employees,
  addDepartment,
  addEmployee,
  updateEmployeeRole,
  clear,
};
