import expenseRepository from '../repository/expense.db';
import userRepository from '../repository/user.db';
import { Expense } from '../model/expense';
import { ExpenseInput } from '../types/index';

const getAllExpenses = async (): Promise<Expense[]> => {
    return await expenseRepository.getAllExpenses();
};

const getExpenseById = async (expenseId: number): Promise<Expense> => {
    const expense = await expenseRepository.getExpenseById({ expenseId });
    if (!expense) throw new Error(`Expense with id ${expenseId} does not exist.`);
    return expense;
};

const addExpense = async (expenseData: ExpenseInput): Promise<Expense> => {
    const user = await userRepository.getUserById({ userId: expenseData.userId });
    if (!user) {
        throw new Error(`User with id ${expenseData.userId} does not exist.`);
    }

    return await expenseRepository.addExpense({
        category: expenseData.category,
        amount: expenseData.amount,
        date: expenseData.date,
        userId: expenseData.userId,
    });
};

export default { getAllExpenses, getExpenseById, addExpense };