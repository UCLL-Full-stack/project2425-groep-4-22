import { ExpenseCategory } from '../types/index';
import { User } from '../model/user';
import { Expense } from '../model/expense';
import { UserRepository } from './user.db';

export class ExpenseRepository {
    private expenses: Expense[] = [];
    userRepository: UserRepository;

    constructor() {
        // Initialize with demo expenses
        this.userRepository = new UserRepository();

        // Get users from UserRepository
        const users = this.userRepository.getAllUsers();
        const user1 = users[0];
        const user2 = users[1];

        this.expenses.push(new Expense(1, 'Rent', 1500, new Date('2023-01-01'), user1));
        this.expenses.push(new Expense(2, 'Groceries', 300, new Date('2023-02-01'), user2));
    }

    // Get all expenses
    getAllExpenses(): Expense[] {
        return this.expenses;
    }

    // Get an expense by ID
    getExpenseById(expenseId: number): Expense | undefined {
        return this.expenses.find(expense => expense.expenseId === expenseId);
    }
}

