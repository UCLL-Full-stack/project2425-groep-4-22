import incomeRepository from '../repository/income.db';
import userRepository from '../repository/user.db';
import { Income } from '../model/income';
import { IncomeInput } from '../types/index';

const getAllIncomes = async (): Promise<Income[]> => incomeRepository.getAllIncomes();

const getIncomeById = async (incomeId: number): Promise<Income> => {
    const income = await incomeRepository.getIncomeById({ incomeId });
    if (!income) throw new Error(`Income with id ${incomeId} does not exist.`);
    return income;
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

export default { getAllIncomes, getIncomeById, addIncome };