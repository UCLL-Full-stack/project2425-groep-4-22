import { IncomeCategory } from '../types/index';
import { Income as IncomePrisma, IncomeCategory as IncomeCategoryPrisma } from '@prisma/client';

export class Income {
    private incomeId?: number;
    private category: string | null;
    private amount: number;
    private date: Date;


    constructor(income: {
        incomeId?: number;
        category: string | null;
        amount: number;
        date: Date;
    }) {


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
        income_id,
        category,
        amount,
        date,
    }: IncomePrisma & { category?: IncomeCategoryPrisma | null }) {
        return new Income({
            incomeId: income_id,
            category: category?.name as IncomeCategory || "", // Use optional chaining and fallback to null
            amount,
            date,
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