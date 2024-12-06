import { ExpenseCategory as ExpenseCategoryPrisma, Expense as ExpensePrisma } from '@prisma/client';
import { Expense } from './expense';

export class ExpenseCategory {
    private id?: number;
    private name: string;
    private expenses: Expense[];

    constructor({ id, name, expenses }: { id?: number; name: string; expenses: Expense[] }) {
        if (!name || name.trim() === '') {
            throw new Error('Category name is required.');
        }

        this.id = id;
        this.name = name;
        this.expenses = expenses;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }

    // Mappers
    static from(prismaCategory: ExpenseCategoryPrisma & { expenses: ExpensePrisma[] }): ExpenseCategory {
        return new ExpenseCategory({
            id: prismaCategory.id,
            name: prismaCategory.name,
            expenses: prismaCategory.expenses.map(expense => Expense.from({
                ...expense,
                category: expense.categoryId ? { id: expense.categoryId, name: '' } : { id: 0, name: '' }
            })),
        });
    }


}