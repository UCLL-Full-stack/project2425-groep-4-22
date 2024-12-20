import { IncomeCategory } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllIncomeCategories = async (): Promise<{ id: number; name: string }[]> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/income-categorys`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch income categories');
    }
    return response.json();
};

const getIncomeCategoryById = async (id: number): Promise<IncomeCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/income-categorys/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch income category');
    }
    return response.json();
};

const addIncomeCategory = async (name: string): Promise<IncomeCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/income-categorys/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error('Failed to add income category');
    }
    return response.json();
};

const updateIncomeCategory = async (id: number, name: string): Promise<IncomeCategory> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/income-categorys/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error('Failed to update income category');
    }
    return response.json();
};

const deleteIncomeCategory = async (id: number): Promise<void> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/income-categorys/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete income category');
    }
};

export default {
    getAllIncomeCategories,
    getIncomeCategoryById,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory
};
