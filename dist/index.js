#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
import { Course } from "./course.js";
import { Student } from "./student.js";
const courses = [];
const students = [];
function addStudent() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: (chalk.yellow("Enter student Name:")),
        },
    ])
        .then((answer) => {
        const student = new Student(answer.name);
        students.push(student);
        console.log(chalk.blue(`Student added. ID: ${student.studentId}`));
        ShowOptions();
    });
}
function enrollStudent() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter student ID:",
        },
        {
            type: "list",
            name: "courseName",
            message: "Select Your Course for Enrollement:",
            choices: courses.map((course) => course.getCourse()),
        },
    ])
        .then((answer) => {
        const student = students.find((s) => s.studentId === answer.id);
        if (student) {
            const selectedCourse = courses.find((course) => course.getCourse() === answer.courseName);
            if (selectedCourse) {
                if (!student.courseExists(selectedCourse)) {
                    student.enroll(selectedCourse);
                    console.log(chalk.blue(`Enrolled in ${answer.courseName}`));
                }
                else {
                    console.log(chalk.yellow(`Already enrolled in ${answer.courseName}`));
                }
            }
            else {
                console.log(chalk.red("Course not found."));
            }
        }
        else {
            console.log(chalk.red("Student not found."));
        }
        ShowOptions();
    });
}
function viewStudentStatus() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter Your student ID:",
        },
    ])
        .then((answer) => {
        const student = students.find((s) => s.studentId === answer.id);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(chalk.red("Student not found."));
        }
        ShowOptions();
    });
}
function addBalance() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter student ID:",
        },
        {
            type: "input",
            name: "amount",
            message: "Enter the amount to deposit:",
        },
    ])
        .then((answer) => {
        const student = students.find((s) => s.studentId === answer.id);
        if (student) {
            student.addBalance(parseFloat(answer.amount));
        }
        else {
            console.log(chalk.red("Student not found."));
        }
        ShowOptions();
    });
}
function TuitionFee() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter student ID:",
        },
        {
            type: "input",
            name: "amount",
            message: "Enter the amount to pay for tuition:",
        },
    ])
        .then((answer) => {
        const student = students.find((s) => s.studentId === answer.id);
        if (student) {
            student.TuitionFee(parseFloat(answer.amount));
        }
        else {
            console.log(chalk.red("Student not found."));
        }
        ShowOptions();
    });
}
function ShowOptions() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Menu:",
            choices: ["Add Student", "Enroll Student", "View Student Status", "Add Balance", "Pay Tuition", "Quit"],
        },
    ])
        .then((answer) => {
        switch (answer.choice) {
            case "Add Student":
                addStudent();
                break;
            case "Enroll Student":
                enrollStudent();
                break;
            case "View Student Status":
                viewStudentStatus();
                break;
            case "Add Balance":
                addBalance();
                break;
            case "Pay Tuition":
                TuitionFee();
                break;
            case "Quit":
                break;
            default:
                console.log(chalk.red("Invalid choice. Try again."));
                ShowOptions();
                break;
        }
    });
}
courses.push(new Course("Phy"));
courses.push(new Course("CS"));
courses.push(new Course("Pk"));
courses.push(new Course("MGT"));
courses.push(new Course("Stat"));
courses.push(new Course("Bio"));
console.log(chalk.blue("Welcome to the Student Management System!"));
ShowOptions();
