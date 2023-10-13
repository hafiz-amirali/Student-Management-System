import chalk from "chalk";
import { Course } from "./course.js";


export class Student {
    private static nextStudentId: number = 1000;
    private _studentId!: string;
    private balance: number = 0;
    private courses: Course[] = [];

    constructor(private name: string) {
        this.generateStudentId();
    }

    private generateStudentId() {
        this._studentId = `STD${Student.nextStudentId++}`;
    }

    get studentId() {
        return this._studentId;
    }

    enroll(course: Course): void {
        this.courses.push(course);
    }

    viewBalance(): number {
        return this.balance;
    }

    addBalance(amount: number) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.blue(`$${amount} added to balance. New balance: $${this.balance}`));
        } else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }

    TuitionFee(amount: number) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(chalk.blue(`$${amount} paid for tuition. New balance: $${this.balance}`));
            } else {
                console.log(chalk.red("Insufficient balance."));
            }
        } else {
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

    courseExists(course: Course): boolean {
        return this.courses.some((c) => c.getCourse() === course.getCourse());
    }
}
