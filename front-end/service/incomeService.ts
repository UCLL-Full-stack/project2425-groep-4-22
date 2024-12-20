import { Income } from '../types';
import { getUserEmailFromToken } from '../src/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async (response: Response) => {
    if (response.status === 401) {
        // Token expired or invalid
        sessionStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
        throw new Error('Session expired. Please log in again.');
    }
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'An error occurred.');
    }
    return response.json();
};

const getAllIncomes = async (): Promise<Income[]> => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('User is not authenticated. Token is missing.');
    }

    const response = await fetch(`${API_URL}/incomes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(response); // Use the helper function
};


const getIncomeById = async (id: number): Promise<Income> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/incomes/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch income');
    }
    return response.json();
};

const addIncome = async (incomeData: Income): Promise<Income> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/incomes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(incomeData),
    });
    if (!response.ok) {
        throw new Error('Failed to add income');
    }
    return response.json();
};

const updateIncome = async (id: number, incomeData: Partial<Income>): Promise<Income> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/incomes/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(incomeData),
    });
    if (!response.ok) {
        throw new Error('Failed to update income');
    }
    return response.json();
};

const deleteIncome = async (id: number): Promise<void> => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/incomes/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete income');
    }
};



export default { getAllIncomes, getIncomeById, addIncome, updateIncome, deleteIncome };