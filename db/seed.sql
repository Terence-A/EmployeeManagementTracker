USE employeeTracker_db;

INSERT INTO department(name)
VALUE   ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal")

INSERT INTO role(title, salary, department_id)
VALUE   ("Sales Lead"),
        ("Salesperson"),
        ("Lead Engineer"),
        ("Software Engineer"),
        ("Account Manager"),
        ("Accountant"),
        ("Legal Team Lead"),
        ("Lawer")

INSERT INTO  employee(first_name, last_name, role_id, manager_id)
VALUE   ("John", "Doe", 1, null),
        ("Mike", "Chan", 2, 1 ),
        ("Ashley", "Rodriguez", 3, null),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, null),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, null),
        ("Tom", "Allen", 8, 7)