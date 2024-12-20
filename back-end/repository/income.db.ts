import { Income } from '../model/income';
import database from './database';
import { IncomeCategory } from '../types/index';
import userRepository from './user.db';

const getAllIncomes = async (): Promise<Income[]> => {
    try {
        const incomePrisma = await database.income.findMany({
            include: {
                user: true,
                category: true
            }
        });
        return incomePrisma.map((incomePrisma) => {
            return Income.from({
                ...incomePrisma,
                category: incomePrisma.category as { id: number; name: string }
            });
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getIncomesByUserId = async (userId: number): Promise<Income[]> => {
    const incomes = await database.income.findMany({
        where: {
            userId, // Filter incomes by userId
        },
        include: {
            category: true, // Include category details if needed
        },
    });

    return incomes.map((incomePrisma) => {
        return Income.from({
            ...incomePrisma,
            category: incomePrisma.category as { id: number; name: string }
        });
    });
};

const getIncomeById = async (incomeId: number): Promise<Income | null> => {
    try {
        const incomePrisma = await database.income.findUnique({
            where: { income_id: incomeId },
            include: {
                user: true,
                category: true
            }
        });
        if (!incomePrisma) return null;
        return Income.from({
            ...incomePrisma,
            category: incomePrisma.category as { id: number; name: string }
        });
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addIncome = async (incomeInput: {
    category: IncomeCategory;
    amount: number;
    date: Date;
    userId: number;
}): Promise<Income> => {
    try {
        const user = await userRepository.getUserById({ userId: incomeInput.userId });
        if (!user) {
            throw new Error(`User with id ${incomeInput.userId} not found`);
        }

        const newIncomePrisma = await database.income.create({
            data: {
                categoryId: parseInt(incomeInput.category as unknown as string),
                amount: incomeInput.amount,
                date: incomeInput.date,
                userId: incomeInput.userId
            },
            include: {
                user: true,
                category: true
            }
        });

        if (!newIncomePrisma.category) {
            throw new Error('Category not found for the new income.');
        }

        const newIncome = Income.from({
            ...newIncomePrisma,
            category: newIncomePrisma.category as { id: number; name: string }
        });

        user.addIncome(newIncome);

        return newIncome;
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateIncome = async (incomeId: number, updateData: {
    category?: IncomeCategory;
    amount?: number;
    date?: Date;
}): Promise<Income | null> => {
    try {
        const updatedIncomePrisma = await database.income.update({
            where: { income_id: incomeId },
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

        return Income.from({
            ...updatedIncomePrisma,
            category: updatedIncomePrisma.category as { id: number; name: string }
        });
    } catch (error) {
        console.error('Error updating income:', error);
        throw new Error('Database error. See server log for details.');
    }
};


const deleteIncome = async (incomeId: number): Promise<void> => {
    try {
        await database.income.delete({
            where: { income_id: incomeId }
        });
    } catch (error) {
        console.error('Error deleting income:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllIncomes,
    getIncomeById,
    addIncome,
    updateIncome,
    deleteIncome,
    getIncomesByUserId
};
