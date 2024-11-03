// Import the required dependencies
import { IncomeCategory } from '../../types';
import { Income } from '../../model/income';

// Valid variables for income
let incomeCategory: IncomeCategory;
let amount: number;
let date: Date;

beforeEach(() => {
    // Data for valid income
    incomeCategory = 'Salary';
    amount = 5000;
    date = new Date('2023-06-15');
});

// Test adding an income - valid data
test('given: valid value for all fields, when: income is created, then: income is created', () => {
    // given

    // when
    const income: Income = new Income({
        category: incomeCategory,
        amount,
        date,
    });

    // then
    expect(income.getCategory()).toEqual(incomeCategory);
    expect(income.getAmount()).toEqual(amount);
    expect(income.getDate()).toEqual(date);
});

// Test adding an income - missing category
test('given: missing income category, when: income is created, then: error is thrown', () => {
    // given
    const missingCategory: IncomeCategory = null as unknown as IncomeCategory;

    // when
    const createIncome = () => new Income({
        category: missingCategory,
        amount,
        date,
    });

    // then
    expect(createIncome).toThrowError('Income category is required.');
});

// Test adding an income - missing amount
test('given: missing income amount, when: income is created, then: error is thrown', () => {
    // given
    const missingAmount: number = null as unknown as number;

    // when
    const createIncome = () => new Income({
        category: incomeCategory,
        amount: missingAmount,
        date,
    });

    // then
    expect(createIncome).toThrowError('Income amount must be a positive number.');
});

// Test adding an income - non-positive amoun