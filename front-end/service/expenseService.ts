import { Expense } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllExpenses = async (): Promise<Expense[]> => {
    const response = await fetch(`${API_URL}/expenses`);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return response.json();
};

const getExpenseById = async (id: number): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch expense');
    }
    return response.json();
};

const addExpense = async (expenseData: Expense): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        throw new Error('Failed to add expense');
    }
    return response.json();
};

export default { getAllExpenses, getExpenseById, addExpense };