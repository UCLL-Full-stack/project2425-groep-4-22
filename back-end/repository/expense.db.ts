
import { Expense } from '../model/expense';

import database from './database';


const getAllExpenses = async (): Promise<Expense[]> => {
    try {

        const ExpensePrisma = await database.expense.findMany({
            include: {
                user: true,
                category: true
            }
        });
        return ExpensePrisma.map((expensePrisma) => {
            return Expense.from({
                ...expensePrisma,
                category: expensePrisma.category as { id: number; name: string }
            });
        });
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }

};


/* const getExpenseById = ({ expenseId }: { expenseId: number }): Expense | null => {
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
}; */

export default {
    getAllExpenses,
    /*  getExpenseById,
     addExpense, */
};
