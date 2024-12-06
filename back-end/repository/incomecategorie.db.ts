import { IncomeCategory } from "../model/incomecategorie";
import database from "./database.db";

const getAllIncomeCategories = async (): Promise<IncomeCategory[]> => {
    try {
        const categoriesPrisma = await database.incomeCategory.findMany({
            include: { incomes: true }, // Include related incomes to avoid empty arrays
        });
        return categoriesPrisma.map((categoryPrisma) => IncomeCategory.from(categoryPrisma));
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const getIncomeCategoryById = async ({ categoryId }: { categoryId: number }): Promise<IncomeCategory | null> => {
    try {
        const categoryPrisma = await database.incomeCategory.findUnique({
            where: { id: categoryId },
            include: { incomes: true }, // Include related incomes
        });
        if (!categoryPrisma) return null;
        return IncomeCategory.from(categoryPrisma);
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const addIncomeCategory = async ({ name }: { name: string }): Promise<IncomeCategory> => {
    try {
        if (!name || name.trim() === '') {
            throw new Error('Category name is required.');
        }

        const newCategoryPrisma = await database.incomeCategory.create({
            data: { name },
            include: { incomes: true },
        });

        return IncomeCategory.from(newCategoryPrisma);
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

const deleteIncomeCategory = async ({ categoryId }: { categoryId: number }): Promise<void> => {
    try {
        await database.incomeCategory.delete({
            where: { id: categoryId },
        });
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllIncomeCategories,
    getIncomeCategoryById,
    addIncomeCategory,
    deleteIncomeCategory,
};
