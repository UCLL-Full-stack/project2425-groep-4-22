import { IncomeCategory as IncomeCategoryPrisma, Income as IncomePrisma } from '@prisma/client';
import { Income } from './income';

export class IncomeCategory {
    private id?: number;
    private name: string;
    private incomes: Income[];

    constructor({ id, name, incomes }: { id?: number; name: string; incomes: Income[] }) {
        if (!name || name.trim() === '') {
            throw new Error('Category name is required.');
        }

        this.id = id;
        this.name = name;
        this.incomes = incomes;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getIncomes(): Income[] {
        return this.incomes;
    }

    // Mappers
    static from(prismaCategory: IncomeCategoryPrisma & { incomes?: IncomePrisma[] }): IncomeCategory {
        const incomes = (prismaCategory.incomes || []).map(income =>
            Income.from({
                ...income,
                category: income.categoryId ? { id: income.categoryId, name: '' } : { id: 0, name: '' },
            })
        );
        return new IncomeCategory({
            id: prismaCategory.id,
            name: prismaCategory.name || 'Unnamed Category',
            incomes,
        });
    }
}
