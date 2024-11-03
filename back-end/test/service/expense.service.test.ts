import expenseService from '../../service/expense.service';
import expenseRepository from '../../repository/expense.db';
import userRepository from '../../repository/user.db';
import { Expense } from '../../model/expense';
import { ExpenseInput } from '../../types';

// Mock the repositories
jest.mock('../../repository/expense.db');
jest.mock('../../repository/user.db');

describe('ExpenseService', () => {
    let expenseData: ExpenseInput;

    beforeEach(() => {
        expenseData = {
            category: 'Groceries',
            amount: 250,
            date: new Date('2023-06-15'),
            userId: 1,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test for getting all expenses
    test('given: all expenses in DB, when: getAllExpenses is called, then: all expenses are returned', async () => {
        // Given
        const expenses: Expense[] = [
            new Expense({ category: 'Groceries', amount: 250, date: new Date('2023-06-15') }),
            new Expense({ category: 'Rent', amount: 1000, date: new Date('2023-06-01') }),
        ];
        (expenseRepository.getAllExpenses as jest.Mock).mockResolvedValue(expenses);

        // When
        const result = await expenseService.getAllExpenses();

        // Then
        expect(result).toEqual(expenses);
    });

    // Test for getting an expense by ID
    test('given: id of expense existing in DB, when: getExpenseById is called, then: expense is returned', async () => {
        // Given
        const expense = new Expense({ category: 'Groceries', amount: 250, date: new Date('2023-06-15') });
        (expenseRepository.getExpenseById as jest.Mock).mockResolvedValue(expense);

        // When
        const result = await expenseService.getExpenseById(1);

        // Then
        expect(result).toEqual(expense);
    });

    // Test for getting an expense by ID - expense does not exist
    test('given: id of expense not existing in DB, when: getExpenseById is called, then: an error is thrown', async () => {
        // Given
        (expenseRepository.getExpenseById as jest.Mock).mockResolvedValue(undefined);

        // When
        const getExpense = async () => await expenseService.getExpenseById(1);

        // Then
        await expect(getExpense).rejects.toThrowError('Expense with id 1 does not exist.');
    });

    // Test for adding a new expense
    test('given: valid expense data, when: addExpense is called, then: expense is added and returned', async () => {
        // Given
        const user = { userId: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'SecurePass123!', role: 'user' };
        (userRepository.getUserById as jest.Mock).mockResolvedValue(user);
        const expense = new Expense({ category: 'Groceries', amount: 250, date: new Date('2023-06-15') });
        (expenseRepository.addExpense as jest.Mock).mockResolvedValue(expense);

        // When
        const result = await expenseService.addExpense(expenseData);

        // Then
        expect(result).toEqual(expense);
    });

    // Test for adding a new expense - user does not exist
    test('given: user does not exist, when: addExpense is called, then: an error is thrown', async () => {
        // Given
        (userRepository.getUserById as jest.Mock).mockResolvedValue(undefined);

        // When
        const addExpense = async () => await expenseService.addExpense(expenseData);

        // Then
        await expect(addExpense).rejects.toThrowError('User with id 1 does not exist.');
    });
});