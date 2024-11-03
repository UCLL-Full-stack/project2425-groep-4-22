import incomeService from '../../service/income.service';
import incomeRepository from '../../repository/income.db';
import userRepository from '../../repository/user.db';
import { Income } from '../../model/income';
import { IncomeInput } from '../../types';

// Mock the repositories
jest.mock('../../repository/income.db');
jest.mock('../../repository/user.db');

describe('IncomeService', () => {
    let incomeData: IncomeInput;

    beforeEach(() => {
        incomeData = {
            category: 'Salary',
            amount: 5000,
            date: new Date('2023-06-15'),
            userId: 1,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test for getting all incomes
    test('given: all incomes in DB, when: getAllIncomes is called, then: all incomes are returned', async () => {
        // Given
        const incomes: Income[] = [
            new Income({ category: 'Salary', amount: 5000, date: new Date('2023-06-15') }),
            new Income({ category: 'Investment', amount: 2000, date: new Date('2023-06-01') }),
        ];
        (incomeRepository.getAllIncomes as jest.Mock).mockResolvedValue(incomes);

        // When
        const result = await incomeService.getAllIncomes();

        // Then
        expect(result).toEqual(incomes);
    });

    // Test for getting an income by ID
    test('given: id of income existing in DB, when: getIncomeById is called, then: income is returned', async () => {
        // Given
        const income = new Income({ category: 'Salary', amount: 5000, date: new Date('2023-06-15') });
        (incomeRepository.getIncomeById as jest.Mock).mockResolvedValue(income);

        // When
        const result = await incomeService.getIncomeById(1);

        // Then
        expect(result).toEqual(income);
    });

    // Test for getting an income by ID - income does not exist
    test('given: id of income not existing in DB, when: getIncomeById is called, then: an error is thrown', async () => {
        // Given
        (incomeRepository.getIncomeById as jest.Mock).mockResolvedValue(undefined);

        // When
        const getIncome = async () => await incomeService.getIncomeById(1);

        // Then
        await expect(getIncome).rejects.toThrowError('Income with id 1 does not exist.');
    });

    // Test for adding a new income
    test('given: valid income data, when: addIncome is called, then: income is added and returned', async () => {
        // Given
        const user = { userId: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'SecurePass123!', role: 'user' };
        (userRepository.getUserById as jest.Mock).mockResolvedValue(user);
        const income = new Income({ category: 'Salary', amount: 5000, date: new Date('2023-06-15') });
        (incomeRepository.addIncome as jest.Mock).mockResolvedValue(income);

        // When
        const result = await incomeService.addIncome(incomeData);

        // Then
        expect(result).toEqual(income);
    });

    // Test for adding a new income - user does not exist
    test('given: user does not exist, when: addIncome is called, then: an error is thrown', async () => {
        // Given
        (userRepository.getUserById as jest.Mock).mockResolvedValue(undefined);

        // When
        const addIncome = async () => await incomeService.addIncome(incomeData);

        // Then
        await expect(addIncome).rejects.toThrowError('User with id 1 does not exist.');
    });
});