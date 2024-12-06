import { Expense, Income } from "@prisma/client";
import { User } from "../model/user";



export type Role = 'admin' | 'member' | 'user';

export type IncomeCategory =
    'Salary' |
    'Interest' |
    'Investment' |
    'Government payments' |
    'Gifts' |
    'Various';

export type ExpenseCategory =
    'Taxes' |
    'Utilities' |
    'Rent' |
    'Insurance' |
    'Groceries' |
    'Restaurants' |
    'Transport' |
    'Health' |
    'Entertainment' |
    'Subscriptions' |
    'Clothing' |
    'Education' |
    'Presents' |
    'Various';

// Input types for creating new instances

export type UserInput = {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    incomes: Income[];
    expenses: Expense[];
    role?: Role;
    roleId?: number;
};

export type IncomeInput = {
    category: IncomeCategory;
    amount: number;
    date: Date;
    userId: number;
};


export type ExpenseInput = {
    category: ExpenseCategory;
    amount: number;
    date: Date;
    userId: number;
};

export type ExpenseCategoryInput = {
    name: ExpenseCategory;
    expenses: Expense[];
};

export type IncomeCategoryInput = {
    name: IncomeCategory;
    incomes: Income[];
};
