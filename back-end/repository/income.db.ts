import { Income } from '../model/income';
import database from './database';


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

/* 
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
}; */

export default {
    getAllIncomes,
    /* getIncomeById,
    addIncome, */
};
