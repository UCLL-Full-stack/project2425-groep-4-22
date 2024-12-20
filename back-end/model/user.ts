import { Income } from './income';
import { Expense } from './expense';
import {
    User as UserPrisma,
    Income as IncomePrisma,
    Expense as ExpensePrisma,
    ExpenseCategory,
    IncomeCategory,
} from '@prisma/client';

export class User {
    public userId?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: number;
    public incomes: Income[];
    public expenses: Expense[];


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
        user_id,
        firstname,
        lastname,
        email,
        password,
        roleId,
        incomes,
        expenses,
    }: UserPrisma & {
        incomes: (IncomePrisma & { category?: { id: number; name: string } | null })[];
        expenses: (ExpensePrisma & { category?: { id: number; name: string } | null })[];
    }) {
        // Create a new User instance
        const user = new User({
            userId: user_id,
            firstName: firstname,
            lastName: lastname,
            email,
            password,
            role: roleId ?? 2, // Default role to 2 if not provided
        });

        // Map expenses safely
        user.expenses = expenses.map((expense) =>
            new Expense({
                expenseId: expense.expense_id,
                category: expense.category?.name || null, // Handle null safely
                amount: expense.amount,
                date: new Date(expense.date),
            })
        );

        // Map incomes safely
        user.incomes = incomes.map((income) =>
            new Income({
                incomeId: income.income_id,
                category: income.category?.name || null, // Handle null safely
                amount: income.amount,
                date: new Date(income.date),
            })
        );

        return user;
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
