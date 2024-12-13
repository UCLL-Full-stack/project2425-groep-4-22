import incomecategorieDb from '../repository/incomecategory.db';
import { IncomeCategory } from '../model/incomecategory';

const getAllIncomeCategories = async (): Promise<IncomeCategory[]> => {
    return await incomecategorieDb.getAllIncomeCategories();
};

const getIncomeCategoryById = async (id: number): Promise<IncomeCategory | null> => {
    return await incomecategorieDb.getIncomeCategoryById({ id });
};

const addIncomeCategory = async (name: string): Promise<IncomeCategory> => {
    if (!name || name.trim() === '') {
        throw new Error('Category name is required.');
    }
    return await incomecategorieDb.addIncomeCategory(name);
};

const updateIncomeCategory = async (id: number, name: string): Promise<IncomeCategory> => {
    if (!name || name.trim() === '') {
        throw new Error('Category name is required.');
    }
    return await incomecategorieDb.updateIncomeCategory(id, name);
};

const deleteIncomeCategory = async (id: number): Promise<void> => {
    await incomecategorieDb.deleteIncomeCategory(id);
};

export default {
    getAllIncomeCategories,
    getIncomeCategoryById,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
};