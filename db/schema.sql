DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db

CREATE TABLE  department(
    id INT NOT NULL AUTO_INCREMENT,
    name: VARCHAR(30)
    PRIMARY kEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES  department(id)

);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT
    PRIMARY KEY(ID)
    FOREIGN KEY (role_id) REFERENCES KEY(roll(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    )

)