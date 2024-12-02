import { ExpenseCategory as ExpenseCategoryPrisma } from '@prisma/client';

export class ExpenseCategory {
    private id?: number;
    private name: string;

    constructor({ id, name }: { id?: number; name: string }) {
        if (!name) {
            throw new Error('Category name is required.');
        }

        this.id = id;
        this.name = name;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    // Mappers
    static from(prismaCategory: ExpenseCategoryPrisma): ExpenseCategory {
        return new ExpenseCategory({
            id: prismaCategory.id,
            name: prismaCategory.name,
        });
    }
}
