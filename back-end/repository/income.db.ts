import { Income } from '../model/income';
import { IncomeCategory, IncomeInput } from '../types/index';
import { User } from '../model/user';
import database from './database';
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

const getIncomeById = async ({ incomeId }: { incomeId: number }): Promise<Income | null> => {
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

const addIncome = async (incomeData: IncomeInput & { userId: number }): Promise<Income> => {
    try {
        const user = await userRepository.getUserById({ userId: incomeData.userId });
        if (!user) {
            throw new Error(`User with id ${incomeData.userId} not found`);
        }

        const newIncomePrisma = await database.income.create({
            data: {
                categoryId: parseInt(incomeData.category as unknown as string),
                amount: incomeData.amount,
                date: incomeData.date,
                userId: incomeData.userId
            },
            include: {
                user: true,
                category: true
            }
        });

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

export default {
    getAllIncomes,
    getIncomeById,
    addIncome,
};