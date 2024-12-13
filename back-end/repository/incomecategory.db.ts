import { IncomeCategory as IncomeCategoryPrisma } from '@prisma/client';
import { IncomeCategory } from '../model/incomecategory';
import database from './database';

const getAllIncomeCategories = async (): Promise<IncomeCategory[]> => {
    try {
        const incomeCategoriesPrisma = await database.incomeCategory.findMany();
        return incomeCategoriesPrisma.map(IncomeCategory.from);
    } catch (error) {
        console.error('Error fetching income categories:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getIncomeCategoryById = async ({ id }: { id: number }): Promise<IncomeCategory | null> => {
    try {
        const incomeCategoryPrisma = await database.incomeCategory.findUnique({
            where: { id },
        });
        if (!incomeCategoryPrisma) return null;
        return IncomeCategory.from(incomeCategoryPrisma);
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addIncomeCategory = async (name: string): Promise<IncomeCategory> => {
    try {
        const newIncomeCategoryPrisma = await database.incomeCategory.create({
            data: { name },
        });
        return IncomeCategory.from(newIncomeCategoryPrisma);
    } catch (error) {
        console.error('Error adding income category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateIncomeCategory = async (id: number, name: string): Promise<IncomeCategory> => {
    try {
        const updatedIncomeCategoryPrisma = await database.incomeCategory.update({
            where: { id },
            data: { name },
        });
        return IncomeCategory.from(updatedIncomeCategoryPrisma);
    } catch (error) {
        console.error('Error updating income category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteIncomeCategory = async (id: number): Promise<void> => {
    try {
        await database.incomeCategory.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Error deleting income category:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllIncomeCategories,
    getIncomeCategoryById,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
};