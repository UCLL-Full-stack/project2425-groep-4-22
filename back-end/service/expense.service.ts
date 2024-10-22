import { ExpenseCategory } from '../types/index';
import { User } from '../model/user';
import { Expense } from '../model/expense';
import { ExpenseRepository } from '../repository/expense.db';


class ExpenseService {
    private expenseRepository: ExpenseRepository;

    constructor() {
        this.expenseRepository = new ExpenseRepository();
    }

    // Get all expenses
    getAllExpenses(): Expense[] {
        return this.expenseRepository.getAllExpenses();
    }

    // Get an expense by ID
    getExpenseById(expenseId: number): Expense | undefined {
        return this.expenseRepository.getExpenseById(expenseId);
    }


}

export const expenseService = new ExpenseService();