import expenseRepository from '../repository/expense.db';
import userRepository from '../repository/user.db';
import { Expense } from '../model/expense';
import { ExpenseInput } from '../types/index';
import expenseDb from '../repository/expense.db';

const getAllExpenses = async (): Promise<Expense[]> => expenseDb.getAllExpenses();

const getExpenseById = async (expenseId: number): Promise<Expense> => {
    const expense = await expenseRepository.getExpenseById({ expenseId });
    if (!expense) throw new Error(`Expense with id ${expenseId} does not exist.`);
    return expense;
};

const addExpense = async (expenseData: ExpenseInput): Promise<Expense> => {
    try {
        const user = await userRepository.getUserById({ userId: expenseData.userId });
        if (!user) {
            throw new Error(`User with id ${expenseData.userId} does not exist.`);
        }

        const newExpense = await expenseRepository.addExpense({
            category: expenseData.category,
            amount: expenseData.amount,
            date: expenseData.date,
            userId: expenseData.userId,
        });

        return newExpense;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw new Error('Internal server error. Please try again later.');
    }
};

export default { getAllExpenses, getExpenseById, addExpense };