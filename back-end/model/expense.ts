import { ExpenseCategory } from '../types/index';
import { User } from './user';

export class Expense {
    expenseId: number;
    category: ExpenseCategory;
    amount: number;
    date: Date;
    user: User;

    constructor(expenseId: number, category: ExpenseCategory, amount: number, date: Date, user: User) {
        this.expenseId = expenseId;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.user = user;
    }
}
