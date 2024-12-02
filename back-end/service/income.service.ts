import incomeRepository from '../repository/income.db';
import userRepository from '../repository/user.db';
import { Income } from '../model/income';
import { IncomeInput } from '../types/index';

const getAllIncomes = async (): Promise<Income[]> => incomeRepository.getAllIncomes();


/* const getIncomeById = (incomeId: number): Income => {
    const income = incomeRepository.getIncomeById({ incomeId });
    if (!income) throw new Error(`Income with id ${incomeId} does not exist.`);
    return income;
};

const addIncome = (incomeData: IncomeInput): Income => {
    const user = userRepository.getUserById({ userId: incomeData.userId });
    if (!user) {
        throw new Error(`User with id ${incomeData.userId} does not exist.`);
    }

    const newIncome = incomeRepository.addIncome({
        ...incomeData,
        user,
    });
    return newIncome;
};
 */
export default { getAllIncomes,/*  getIncomeById, addIncome */ };
