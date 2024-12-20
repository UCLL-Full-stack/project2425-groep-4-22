import incomeRepository from '../repository/income.db';
import userRepository from '../repository/user.db';
import { Income } from '../model/income';
import { IncomeInput } from '../types/index';

const getAllIncomes = async (): Promise<Income[]> => incomeRepository.getAllIncomes();

const getIncomesByUserId = async (userId: number): Promise<Income[]> => {
    const user = await userRepository.getUserById({ userId });
    if (!user) {
        throw new Error(`User with id ${userId} does not exist.`);
    }

    const incomes = await incomeRepository.getIncomesByUserId(userId);
    return incomes;
};

const addIncome = async (incomeData: IncomeInput): Promise<Income> => {
    const user = await userRepository.getUserById({ userId: incomeData.userId });
    if (!user) {
        throw new Error(`User with id ${incomeData.userId} does not exist.`);
    }

    return await incomeRepository.addIncome({
        ...incomeData,
        userId: incomeData.userId,
    });
};

const updateIncome = async (incomeId: number, updateData: Partial<IncomeInput>): Promise<Income> => {
    const income = await incomeRepository.getIncomeById(incomeId);
    if (!income) throw new Error(`Income with id ${incomeId} does not exist.`);
    const updatedIncome = await incomeRepository.updateIncome(incomeId, updateData);
    if (!updatedIncome) throw new Error(`Failed to update income with id ${incomeId}.`);
    return updatedIncome;
};

const deleteIncome = async (incomeId: number): Promise<void> => {
    const income = await incomeRepository.getIncomeById(incomeId);
    if (!income) throw new Error(`Income with id ${incomeId} does not exist.`);
    await incomeRepository.deleteIncome(incomeId);
};

export default { getAllIncomes, getIncomesByUserId, addIncome, updateIncome, deleteIncome };
