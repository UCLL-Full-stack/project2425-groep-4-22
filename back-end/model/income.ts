import { IncomeCategory } from '../types/index';
import { Income as IncomePrisma, IncomeCategory as IncomeCategoryPrisma } from '@prisma/client';

export class Income {
    private incomeId?: number;
    private category: IncomeCategory;
    private amount: number;
    private date: Date;

    constructor(income: {
        incomeId?: number;
        category: IncomeCategory;
        amount: number;
        date: Date;
    }) {
        if (!income.category) {
            throw new Error('Income category is required.');
        }

        if (income.amount <= 0) {
            throw new Error('Income amount must be a positive number.');
        }

        if (isNaN(income.date.getTime())) {
            throw new Error('Invalid date.');
        }

        this.incomeId = income.incomeId;
        this.category = income.category;
        this.amount = income.amount;
        this.date = income.date;
    }

    // Getters
    getIncomeId(): number | undefined {
        return this.incomeId;
    }

    getCategory(): IncomeCategory {
        return this.category;
    }

    getAmount(): number {
        return this.amount;
    }

    getDate(): Date {
        return this.date;
    }

    static from(prismaIncome: IncomePrisma & { category?: { id: number; name: string } | null }): Income {
        return new Income({
            incomeId: prismaIncome.income_id,
            category: prismaIncome.category
                ? { id: prismaIncome.category.id, name: prismaIncome.category.name }
                : { id: 0, name: 'Uncategorized' }, // Provide a default category
            amount: prismaIncome.amount,
            date: new Date(prismaIncome.date),
        });
    }


    // Equals method to compare incomes
    equals(income: Income): boolean {
        return (
            this.category === income.getCategory() &&
            this.amount === income.getAmount() &&
            this.date.getTime() === income.getDate().getTime()
        );
    }
}
