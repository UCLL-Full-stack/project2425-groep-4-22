import expenseRepository from '../repository/expense.db';
import userRepository from '../repository/user.db';
import { Expense } from '../model/expense';
import { ExpenseInput } from '../types/index';
import expenseDb from '../repository/expense.db';
import database from '../repository/database';
import { ExpenseCategory } from '../model/expensecategory';

const getAllExpenses = async (): Promise<Expense[]> => expenseDb.getAllExpenses();


const getExpenseById = async ({ expenseId }: { expenseId: number }): Promise<Expense | null> => {
    try {
        const expensePrisma = await database.expense.findUnique({
            where: { expense_id: expenseId },
            include: {
                user: true,
                category: true
            }
        });
        if (!expensePrisma) return null;
        return Expense.from({
            ...expensePrisma,
            category: expensePrisma.category as { id: number; name: string }
        });
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addExpense = async (expenseInput: {
    category: ExpenseCategory | string; // Accepts both ExpenseCategory object and string ID
    amount: number;
    date: Date;
    userId: number;
}): Promise<Expense> => {
    try {
        // Validate and fetch the user
        const user = await userRepository.getUserById({ userId: expenseInput.userId });
        if (!user) {
            throw new Error(`User with id ${expenseInput.userId} not found`);
        }

        // Determine the categoryId
        let categoryId: number;
        if (typeof expenseInput.category === 'string') {
            categoryId = parseInt(expenseInput.category, 10); // Convert string to number
        } else if (typeof expenseInput.category === 'object' && 'getId' in expenseInput.category) {
            categoryId = (expenseInput.category as ExpenseCategory).getId(); // Use the public method to get the `id`
        } else {
            throw new Error('Invalid category provided.');
        }

        if (!categoryId || isNaN(categoryId)) {
            throw new Error('Invalid category ID provided.');
        }

        // Add the new expense to the database
        const newExpensePrisma = await database.expense.create({
            data: {
                categoryId,
                amount: expenseInput.amount,
                date: expenseInput.date,
                userId: expenseInput.userId,
            },
            include: {
                user: true,
                category: true,
            },
        });

        if (!newExpensePrisma.category) {
            throw new Error('Category not found for the new expense.');
        }

        // Map Prisma response to the Expense object
        const newExpense = Expense.from({
            ...newExpensePrisma,
            category: newExpensePrisma.category as { id: number; name: string },
        });

        user.addExpense(newExpense);

        return newExpense;
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};




const updateExpense = async (expenseId: number, updateData: Partial<ExpenseInput>): Promise<Expense | null> => {
    try {
        const dataToUpdate: any = {
            ...(updateData.amount && { amount: updateData.amount }),
            ...(updateData.date && { date: updateData.date }),
        };

        if (updateData.category) {
            dataToUpdate.categoryId =
                typeof updateData.category === 'string'
                    ? parseInt(updateData.category, 10) // Convert string ID to number
                    : (updateData.category as ExpenseCategory).getId(); // Use the ID if it's an ExpenseCategory object.
            if (isNaN(dataToUpdate.categoryId)) {
                throw new Error('Invalid category ID provided.');
            }
        }

        const updatedExpensePrisma = await database.expense.update({
            where: { expense_id: expenseId },
            data: dataToUpdate,
            include: {
                user: true,
                category: true,
            },
        });

        return Expense.from({
            ...updatedExpensePrisma,
            category: updatedExpensePrisma.category as { id: number; name: string },
        });
    } catch (error) {
        console.error('Error updating expense:', error);
        throw new Error('Database error. See server log for details.');
    }
};


const deleteExpense = async (expenseId: number): Promise<void> => {
    try {
        await database.expense.delete({
            where: { expense_id: expenseId }
        });
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
};
