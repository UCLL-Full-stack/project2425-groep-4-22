import { IncomeCategory } from '../types/index';
import { User } from '../model/user';
import { Income } from '../model/income';
import { IncomeRepository } from '../repository/income.db';

class IncomeService {
    private incomeRepository: IncomeRepository;

    constructor() {
        this.incomeRepository = new IncomeRepository();
    }

    // Get all incomes
    getAllIncomes(): Income[] {
        return this.incomeRepository.getAllIncomes();
    }

    // Get an income by ID
    getIncomeById(incomeId: number): Income | undefined {
        return this.incomeRepository.getIncomeById(incomeId);
    }




}

export const incomeService = new IncomeService();