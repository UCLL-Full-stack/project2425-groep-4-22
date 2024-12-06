import expenseCategoryRepository from '../repository/expensecategorie.db';

const getAllExpenseCategories = async () => {
    try {
        return await expenseCategoryRepository.getAllExpenseCategories();
    } catch (error) {
        console.error('Error fetching expense categories in service:', error);
        throw new Error('Error fetching expense categories.');
    }
};

const getExpenseCategoryById = async (id: number) => {
    try {
        return await expenseCategoryRepository.getExpenseCategoryById({ categoryId: id });
    } catch (error) {
        console.error('Error fetching expense category in service:', error);
        throw new Error('Error fetching expense category.');
    }
};

const addExpenseCategory = async (name: string) => {
    try {
        return await expenseCategoryRepository.addExpenseCategory({ name });
    } catch (error) {
        console.error('Error adding expense category in service:', error);
        throw new Error('Error adding expense category.');
    }
};

const deleteExpenseCategory = async (id: number) => {
    try {
        await expenseCategoryRepository.deleteExpenseCategory({ categoryId: id });
    } catch (error) {
        console.error('Error deleting expense category in service:', error);
        throw new Error('Error deleting expense category.');
    }
};

export default {

    getAllExpenseCategories,
    getExpenseCategoryById,
    addExpenseCategory,
    deleteExpenseCategory,
};