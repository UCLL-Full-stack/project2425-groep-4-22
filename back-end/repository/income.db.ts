import { IncomeCategory, IncomeInput } from '../types/index';
import { User } from '../model/user';
import { Income } from '../model/income';
import userRepository from './user.db';


const incomes = [
    new Income({
        incomeId: 1,
        category: 'Salary' as IncomeCategory,
        amount: 5000,
        date: new Date('2023-01-01')
    }),
    new Income({
        incomeId: 2,
        category: 'Investment' as IncomeCategory,
        amount: 2000,
        date: new Date('2023-02-01')
    })
];


const users = userRepository.getAllUsers();
if (users[0]) users[0].addIncome(incomes[0]);
if (users[1]) users[1].addIncome(incomes[1]);


const getAllIncomes = (): Income[] => incomes;


const getIncomeById = ({ incomeId }: { incomeId: number }): Income | null => {
    try {
        return incomes.find((income) => income.getIncomeId() === incomeId) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const addIncome = (incomeData: IncomeInput & { user: User }): Income => {
    const newIncomeId = incomes.length + 1;
    const newIncome = new Income({
        incomeId: newIncomeId,
        ...incomeData
    });
    incomes.push(newIncome);
    incomeData.user.addIncome(newIncome);
    return newIncome;
};

export default {
    getAllIncomes,
    getIncomeById,
    addIncome,
};
