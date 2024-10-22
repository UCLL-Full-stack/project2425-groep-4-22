import { IncomeCategory } from '../types/index';
import { User } from '../model/user';
import { Income } from '../model/income';
import { UserRepository } from './user.db';

class IncomeRepository {
    private incomes: Income[] = [];
    userRepository: UserRepository;

    constructor() {
        // Initialize with demo incomes
        this.userRepository = new UserRepository();

        // Get users from UserRepository
        const users = this.userRepository.getAllUsers();
        const user1 = users[0];
        const user2 = users[1];

        this.incomes.push(new Income(1, 'Salary', 5000, new Date('2023-01-01'), user1));
        this.incomes.push(new Income(2, 'Investment', 2000, new Date('2023-02-01'), user2));
    }

    // Get all incomes
    getAllIncomes(): Income[] {
        return this.incomes;
    }

    // Get an income by ID
    getIncomeById(incomeId: number): Income | undefined {
        return this.incomes.find(income => income.incomeId === incomeId);
    }
}

export { IncomeRepository };