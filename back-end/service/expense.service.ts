import expenseRepository from '../repository/expense.db';
import userRepository from '../repository/user.db';
import { Expense } from '../model/expense';
import { ExpenseInput } from '../types/index';

const getAllExpenses = (): Expense[] => expenseRepository.getAllExpenses();

const getExpenseById = (expenseId: number): Expense => {
    const expense = expenseRepository.getExpenseById({ expenseId });
    if (!expense) throw new Error(`Expense with id ${expenseId} does not exist.`);
    return expense;
};

const addExpense = (expenseData: ExpenseInput): Expense => {
    const user = userRepository.getUserById({ userId: expenseData.userId });
    if (!user) {
        throw new Error(`User with id ${expenseData.userId} does not exist.`);
    }

    return expenseRepository.addExpense({
        category: expenseData.category,
        amount: expenseData.amount,
        date: expenseData.date,
        userId: expenseData.userId,
    });
};

export default { getAllExpenses, getExpenseById, addExpense };
