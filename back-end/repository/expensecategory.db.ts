import { ExpenseCategory as ExpenseCategoryPrisma } from '@prisma/client';
import { ExpenseCategory } from '../model/expensecategory';
import database from './database';

const getAllExpenseCategories = async (): Promise<ExpenseCategory[]> => {
    try {
        const expenseCategoriesPrisma = await database.expenseCategory.findMany();
        return expenseCategoriesPrisma.map(ExpenseCategory.from);
    } catch (error) {
        console.error('Error fetching expense categories:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getExpenseCategoryById = async ({ id }: { id: number }): Promise<ExpenseCategory | null> => {
    try {
        const expenseCategoryPrisma = await database.expenseCategory.findUnique({
            where: { id },
        });
        if (!expenseCategoryPrisma) return null;
        return ExpenseCategory.from(expenseCategoryPrisma);
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addExpenseCategory = async (name: string): Promise<ExpenseCategory> => {
    try {
        const newExpenseCategoryPrisma = await database.expenseCategory.create({
            data: { name },
        });
        return ExpenseCategory.from(newExpenseCategoryPrisma);
    } catch (error) {
        console.error('Error adding expense category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateExpenseCategory = async (id: number, name: string): Promise<ExpenseCategory> => {
    try {
        const updatedExpenseCategoryPrisma = await database.expenseCategory.update({
            where: { id },
            data: { name },
        });
        return ExpenseCategory.from(updatedExpenseCategoryPrisma);
    } catch (error) {
        console.error('Error updating expense category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteExpenseCategory = async (id: number): Promise<void> => {
    try {
        await database.expenseCategory.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error deleting expense category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExpenseCategories,
    getExpenseCategoryById,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
};