import { ExpenseCategory } from '../types/index';

export class Expense {
    private expenseId?: number;
    private category: ExpenseCategory;
    private amount: number;
    private date: Date;

    constructor(expense: {
        expenseId?: number;
        category: ExpenseCategory;
        amount: number;
        date: Date;
    }) {
        this.expenseId = expense.expenseId;
        this.category = expense.category;
        this.amount = expense.amount;
        this.date = expense.date;
    }

    // Getters
    getExpenseId(): number | undefined {
        return this.expenseId;
    }

    getCategory(): ExpenseCategory {
        return this.category;
    }

    getAmount(): number {
        return this.amount;
    }

    getDate(): Date {
        return this.date;
    }


    equals(expense: Expense): boolean {
        return (
            this.category === expense.getCategory() &&
            this.amount === expense.getAmount() &&
            this.date.getTime() === expense.getDate().getTime()
        );
    }
}
