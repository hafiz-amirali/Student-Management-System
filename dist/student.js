import chalk from "chalk";
export class Student {
    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.courses = [];
        this.generateStudentId();
    }
    generateStudentId() {
        this._studentId = `STD${Student.nextStudentId++}`;
    }
    get studentId() {
        return this._studentId;
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        return this.balance;
    }
    addBalance(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.blue(`$${amount} added to balance. New balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }
    TuitionFee(amount) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(chalk.blue(`$${amount} paid for tuition. New balance: $${this.balance}`));
            }
            else {
                console.log(chalk.red("Insufficient balance."));
            }
        }
        else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }
    showStatus() {
        console.log(chalk.green("Student Details:"));
        console.log(chalk.green(`ID: ${this.studentId}`));
        console.log(chalk.green(`Name: ${this.name}`));
        console.log(chalk.yellow("Courses Enrolled:"));
        this.courses.forEach((course) => console.log(chalk.yellow(`- ${course.getCourse()}`)));
        console.log(chalk.green(`Balance: $${this.balance}`));
    }
    courseExists(course) {
        return this.courses.some((c) => c.getCourse() === course.getCourse());
    }
}
Student.nextStudentId = 1000;
