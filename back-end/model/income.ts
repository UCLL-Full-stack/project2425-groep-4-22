import { IncomeCategory } from '../types/index';

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

    // Equals method to compare incomes
    equals(income: Income): boolean {
        return (
            this.category === income.getCategory() &&
            this.amount === income.getAmount() &&
            this.date.getTime() === income.getDate().getTime()
        );
    }
}
