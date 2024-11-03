// Import the required dependencies
import { ExpenseCategory } from '../../types/index';
import { Expense } from '../../model/expense';
import { User } from '../../model/user';

// Valid variables for expense
let expenseCategory: ExpenseCategory;
let amount: number;
let date: Date;
let user;

beforeEach(() => {
    // Data for valid expense
    expenseCategory = 'Groceries';
    amount = 250;
    date = new Date('2023-06-15');
    user = {
        userId: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        password: 'SecurePass123!',
        role: 'user'
    };
});

// Test adding an expense - valid data
test('given: valid value for all fields, when: expense is created, then: expense is created', () => {
    // given

    // when
    const expense: Expense = new Expense({
        category: expenseCategory,
        amount,
        date,
    });

    // then
    expect(expense.getCategory()).toEqual(expenseCategory);
    expect(expense.getAmount()).toEqual(amount);
    expect(expense.getDate()).toEqual(date);
});

// Test adding an expense - missing category
test('given: missing expense category, when: expense is created, then: error is thrown', () => {
    // given
    const missingCategory: ExpenseCategory = '' as ExpenseCategory;

    // when
    const createExpense = () => new Expense({
        category: missingCategory,
        amount,
        date,
    });

    // then
    expect(createExpense).toThrowError('Expense category is required.');
});

// Test adding an expense - missing amount
test('given: missing expense amount, when: expense is created, then: error is thrown', () => {
    // given
    const missingAmount: number = null as unknown as number;

    // when
    const createExpense = () => new Expense({
        category: expenseCategory,
        amount: missingAmount,
        date,
    });

    // then
    expect(createExpense).toThrowError('Expense amount must be a positive number.');
});

// Test adding an expense - non-positive amount
test('given: non-positive expense amount, when: expense is created, then: error is thrown', () => {
    // given
    const nonPositiveAmount: number = -100;

    // when
    const createExpense = () => new Expense({
        category: expenseCategory,
        amount: nonPositiveAmount,
        date,
    });

    // then
    expect(createExpense).toThrowError('Expense amount must be a positive number.');
});

// Test adding an expense - invalid date
test('given: invalid expense date, when: expense is created, then: error is thrown', () => {
    // given
    const invalidDate: Date = new Date('invalid-date');

    // when
    const createExpense = () => new Expense({
        category: expenseCategory,
        amount,
        date: invalidDate,
    });

    // then
    expect(createExpense).toThrowError('Invalid date.');
});