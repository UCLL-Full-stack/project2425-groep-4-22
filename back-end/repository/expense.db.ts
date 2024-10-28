import { ExpenseCategory } from '../types/index';
import { Expense } from '../model/expense';
import userRepository from './user.db';


const expenses = [
    new Expense({
        expenseId: 1,
        category: 'Rent' as ExpenseCategory,
        amount: 1500,
        date: new Date('2023-01-01')
    }),
    new Expense({
        expenseId: 2,
        category: 'Groceries' as ExpenseCategory,
        amount: 300,
        date: new Date('2023-02-01')
    })
];


const users = userRepository.getAllUsers();
if (users[0]) users[0].addExpense(expenses[0]);
if (users[1]) users[1].addExpense(expenses[1]);


const getAllExpenses = (): Expense[] => expenses;


const getExpenseById = ({ expenseId }: { expenseId: number }): Expense | null => {
    try {
        return expenses.find((expense) => expense.getExpenseId() === expenseId) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const addExpense = (expenseData: {
    category: ExpenseCategory;
    amount: number;
    date: Date;
    userId: number;
}): Expense => {
    const newExpenseId = expenses.length + 1;
    const newExpense = new Expense({
        expenseId: newExpenseId,
        category: expenseData.category,
        amount: expenseData.amount,
        date: expenseData.date
    });


    const user = userRepository.getUserById({ userId: expenseData.userId });
    if (!user) {
        throw new Error(`User with id ${expenseData.userId} not found`);
    }
    user.addExpense(newExpense);


    expenses.push(newExpense);
    return newExpense;
};

export default {
    getAllExpenses,
    getExpenseById,
    addExpense,
};
