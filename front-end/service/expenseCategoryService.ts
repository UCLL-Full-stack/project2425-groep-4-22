import { ExpenseCategory } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllExpenseCategories = async (): Promise<{ id: number; name: string }[]> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expense-categorys`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch expense categories');
    }
    return response.json();
};

const getExpenseCategoryById = async (id: number): Promise<ExpenseCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expense-categorys/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch expense category');
    }
    return response.json();
};

const addExpenseCategory = async (name: string): Promise<ExpenseCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expense-categorys/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error('Failed to add expense category');
    }
    return response.json();
};

const updateExpenseCategory = async (id: number, name: string): Promise<ExpenseCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expense-categorys/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error('Failed to update expense category');
    }
    return response.json();
};

const deleteExpenseCategory = async (id: number): Promise<void> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/expense-categorys/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete expense category');
    }
};

export default { getAllExpenseCategories, getExpenseCategoryById, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory };