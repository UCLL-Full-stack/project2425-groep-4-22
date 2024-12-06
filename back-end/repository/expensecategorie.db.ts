import { ExpenseCategory } from '../model/expensecategorie';
import database from './database.db';

const getAllExpenseCategories = async (): Promise<ExpenseCategory[]> => {
    try {
        const categoriesPrisma = await database.expenseCategory.findMany({
            include: { expenses: true }, // Include related expenses
        });
        return categoriesPrisma.map((categoryPrisma) => ExpenseCategory.from(categoryPrisma));
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const getExpenseCategoryById = async ({ categoryId }: { categoryId: number }): Promise<ExpenseCategory | null> => {
    try {
        const categoryPrisma = await database.expenseCategory.findUnique({
            where: { id: categoryId },
            include: { expenses: true }, // Include related expenses
        });
        if (!categoryPrisma) return null;
        return ExpenseCategory.from(categoryPrisma);
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const addExpenseCategory = async ({ name }: { name: string }): Promise<ExpenseCategory> => {
    try {
        if (!name || name.trim() === '') {
            throw new Error('Category name is required.');
        }

        const newCategoryPrisma = await database.expenseCategory.create({
            data: { name },
            include: { expenses: true }, // Include related expenses
        });

        return ExpenseCategory.from(newCategoryPrisma);
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const deleteExpenseCategory = async ({ categoryId }: { categoryId: number }): Promise<void> => {
    try {
        await database.expenseCategory.delete({
            where: { id: categoryId },
        });
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExpenseCategories,
    getExpenseCategoryById,
    addExpenseCategory,
    deleteExpenseCategory,
};
