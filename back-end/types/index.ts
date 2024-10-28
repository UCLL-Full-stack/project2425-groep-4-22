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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
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
