
import { Income } from './income';
import { Expense } from './expense';
import { User as UserPrisma, Income as IncomePrisma, Expense as ExpensePrisma } from '@prisma/client';


export class User {
    private userId?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: number;
    private incomes: Income[];
    private expenses: Expense[];

    constructor(user: {
        userId?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: number;
    }) {
        if (!user.firstName) {
            throw new Error('First name is required.');
        }

        if (!user.lastName) {
            throw new Error('Last name is required.');
        }

        if (!user.email) {
            throw new Error('Email is required.');
        }

        if (!this.isValidEmail(user.email)) {
            throw new Error('Invalid email format.');
        }

        if (!user.password) {
            throw new Error('Password is required.');
        }

        if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
        }

        if (!user.role) {
            throw new Error('Role is required.');
        }

        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.incomes = [];
        this.expenses = [];
    }

    // Getters
    getUserId(): number | undefined {
        return this.userId;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): number {
        return this.role;
    }

    getIncomes(): Income[] {
        return this.incomes;
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }

    // Add income
    addIncome(income: Income): void {
        this.incomes.push(income);
    }

    // Add expense
    addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }

    // Mappers
    static from({
        id,
        firstname,
        lastname,
        email,
        password,
        roleId,
        incomes,
        expenses,
    }: UserPrisma & {
        incomes: IncomePrisma[];
        expenses: ExpensePrisma[];
    }) {
        return new User({
            userId: id,
            firstName: firstname,
            lastName: lastname,
            email,
            password,
            role: roleId ?? 2,
        });
    }

    // Equals method to compare users
    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName()
        );
    }

    // Helper method to validate email format
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}