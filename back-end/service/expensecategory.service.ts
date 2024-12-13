import expenseCategoryDb from '../repository/expensecategory.db';
import { ExpenseCategory } from '../model/expensecategory';

const getAllExpenseCategories = async (): Promise<ExpenseCategory[]> => {
    return await expenseCategoryDb.getAllExpenseCategories();
};

const getExpenseCategoryById = async (id: number): Promise<ExpenseCategory | null> => {
    return await expenseCategoryDb.getExpenseCategoryById({ id });
};

const addExpenseCategory = async (name: string): Promise<ExpenseCategory> => {
    if (!name || name.trim() === '') {
        throw new Error('Category name is required.');
    }
    return await expenseCategoryDb.addExpenseCategory(name);
};

const updateExpenseCategory = async (id: number, name: string): Promise<ExpenseCategory> => {
    if (!name || name.trim() === '') {
        throw new Error('Category name is required.');
    }
    return await expenseCategoryDb.updateExpenseCategory(id, name);
};

const deleteExpenseCategory = async (id: number): Promise<void> => {
    await expenseCategoryDb.deleteExpenseCategory(id);
};

export default {
    getAllExpenseCategories,
    getExpenseCategoryById,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
};