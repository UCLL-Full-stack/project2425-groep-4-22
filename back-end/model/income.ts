import { IncomeCategory } from '../types/index';
import { User } from './user';

export class Income {
    incomeId: number;
    category: IncomeCategory;  // Use IncomeCategory type instead of enum
    amount: number;
    date: Date;
    user: User;  // Use User type from types file

    constructor(incomeId: number, category: IncomeCategory, amount: number, date: Date, user: User) {
        this.incomeId = incomeId;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.user = user;
    }
}
