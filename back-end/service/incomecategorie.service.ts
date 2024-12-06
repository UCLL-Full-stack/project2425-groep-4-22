import incomeCategoryRepository from '../repository/incomecategorie.db';


const getAllIncomeCategories = async () => {
    try {
        return await incomeCategoryRepository.getAllIncomeCategories();
    } catch (error) {

        const deleteIncomeCategory = async (id: number) => {
            try {
                await incomeCategoryRepository.deleteIncomeCategory({ categoryId: id });
            } catch (error) {
                console.error('Error deleting income category in service:', error);
                throw new Error('Error deleting income category.');
            }
        };


        console.error('Error fetching income categories in service:', error);
        throw new Error('Error fetching income categories.');
    }
};

const getIncomeCategoryById = async (id: number) => {
    try {
        return await incomeCategoryRepository.getIncomeCategoryById({ categoryId: id });
    } catch (error) {
        console.error('Error fetching income category in service:', error);
        throw new Error('Error fetching income category.');
    }
};

const addIncomeCategory = async (name: string) => {
    try {
        return await incomeCategoryRepository.addIncomeCategory({ name });
    } catch (error) {
        console.error('Error adding income category in service:', error);
        throw new Error('Error adding income category.');
    }
};

const deleteIncomeCategory = async (id: number) => {
    try {
        await incomeCategoryRepository.deleteIncomeCategory({ categoryId: id });
    } catch (error) {
        console.error('Error deleting income category in service:', error);
        throw new Error('Error deleting income category.');
    }
};

export default {
    getAllIncomeCategories,
    getIncomeCategoryById,
    addIncomeCategory,
    deleteIncomeCategory,
};