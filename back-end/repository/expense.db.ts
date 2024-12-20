import { Expense } from '../model/expense';
import database from './database';
import { ExpenseCategory } from '@prisma/client';
import userRepository from './user.db';

const getAllExpenses = async (): Promise<Expense[]> => {
    try {
        const ExpensePrisma = await database.expense.findMany({
            include: {
                user: true,
                category: true
            }
        });
        return ExpensePrisma.map((expensePrisma) => {
            return Expense.from({
                ...expensePrisma,
                category: expensePrisma.category as { id: number; name: string }
            });
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getExpenseById = async ({ expenseId }: { expenseId: number }): Promise<Expense | null> => {
    try {
        const expensePrisma = await database.expense.findUnique({
            where: { expense_id: expenseId },
            include: {
                user: true,
                category: true
            }
        });
        if (!expensePrisma) return null;
        return Expense.from({
            ...expensePrisma,
            category: expensePrisma.category as { id: number; name: string }
        });
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addExpense = async (expenseInput: {
    category: ExpenseCategory;
    amount: number;
    date: Date;
    userId: number;
}): Promise<Expense> => {
    try {
        const user = await userRepository.getUserById({ userId: expenseInput.userId });
        if (!user) {
            throw new Error(`User with id ${expenseInput.userId} not found`);
        }

        const newExpensePrisma = await database.expense.create({
            data: {
                categoryId: parseInt(expenseInput.category as unknown as string),
                amount: expenseInput.amount,
                date: expenseInput.date,
                userId: expenseInput.userId
            },
            include: {
                user: true,
                category: true
            }
        });

        if (!newExpensePrisma.category) {
            throw new Error('Category not found for the new expense.');
        }

        const newExpense = Expense.from({
            ...newExpensePrisma,
            category: newExpensePrisma.category as { id: number; name: string }
        });

        user.addExpense(newExpense);

        return newExpense;
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateExpense = async (expenseId: number, updateData: {
    category?: ExpenseCategory;
    amount?: number;
    date?: Date;
}): Promise<Expense | null> => {
    try {
        const updatedExpensePrisma = await database.expense.update({
            where: { expense_id: expenseId },
            data: {
                ...(updateData.category !== undefined && { categoryId: Number(updateData.category) }),
                ...(updateData.amount !== undefined && { amount: updateData.amount }),
                ...(updateData.date !== undefined && { date: updateData.date })
            },
            include: {
                user: true,
                category: true
            }
        });

        return Expense.from({
            ...updatedExpensePrisma,
            category: updatedExpensePrisma.category as { id: number; name: string }
        });
    } catch (error) {
        console.error('Error updating expense:', error);
        throw new Error('Database error. See server log for details.');
    }
};


const deleteExpense = async (expenseId: number): Promise<void> => {
    try {
        await database.expense.delete({
            where: { expense_id: expenseId }
        });
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
};
