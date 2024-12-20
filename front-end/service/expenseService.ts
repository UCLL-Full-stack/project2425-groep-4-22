import { Expense } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllExpenses = async (): Promise<Expense[]> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expenses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return response.json();
};

const getExpenseById = async (id: number): Promise<Expense> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch expense');
    }
    return response.json();
};

const addExpense = async (expenseData: Expense): Promise<Expense> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expenses/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        throw new Error('Failed to add expense');
    }
    return response.json();
};

const updateExpense = async (id: number, expenseData: Partial<Expense>): Promise<Expense> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expenses/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        throw new Error('Failed to update expense');
    }
    return response.json();
};

const deleteExpense = async (id: number): Promise<void> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expenses/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete expense');
    }
};

export default { getAllExpenses, getExpenseById, addExpense, updateExpense, deleteExpense };