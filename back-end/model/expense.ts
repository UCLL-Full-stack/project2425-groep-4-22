import { ExpenseCategory } from '@prisma/client';
import { Expense as ExpensePrisma, ExpenseCategory as ExpenseCategoryPrisma } from '@prisma/client';

export class Expense {
    private expenseId?: number;
    private category: string | null;
    private amount: number;
    private date: Date;

    constructor(expense: {
        expenseId?: number;
        category: string | null;
        amount: number;
        date: Date;
    }) {


        if (expense.amount <= 0) {
            throw new Error('Expense amount must be a positive number.');
        }

        if (isNaN(expense.date.getTime())) {
            throw new Error('Invalid date.');
        }

        this.expenseId = expense.expenseId;
        this.category = expense.category;
        this.amount = expense.amount;
        this.date = expense.date;
    }

    // Getters
    getExpenseId(): number | undefined {
        return this.expenseId;
    }

    getCategory(): string | null {
        return this.category;
    }

    getAmount(): number {
        return this.amount;
    }

    getDate(): Date {
        return this.date;
    }

    // Mappers
    static from({
        expense_id,
        category,
        amount,
        date,
    }: ExpensePrisma & { category: ExpenseCategoryPrisma }): Expense {
        if (!category) {
            throw new Error('Expense category is required.');
        }

        return new Expense({
            expenseId: expense_id,
            category: category.name || "",
            amount,
            date,
        });
    }




    equals(expense: Expense): boolean {
        return (
            this.category === expense.getCategory() &&
            this.amount === expense.getAmount() &&
            this.date.getTime() === expense.getDate().getTime()
        );
    }
}