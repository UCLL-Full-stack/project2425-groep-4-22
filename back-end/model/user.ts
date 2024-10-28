import { Role } from '../types/index';
import { Income } from './income';
import { Expense } from './expense';

export class User {
    private userId?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;
    private incomes: Income[];
    private expenses: Expense[];

    constructor(user: {
        userId?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.incomes = [];
        this.expenses = [];
    }


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

    getRole(): Role {
        return this.role;
    }

    getIncomes(): Income[] {
        return this.incomes;
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }


    addIncome(income: Income): void {
        this.incomes.push(income);
    }


    addExpense(expense: Expense): void {
        this.expenses.push(expense);
    }


    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName()
        );
    }
}
