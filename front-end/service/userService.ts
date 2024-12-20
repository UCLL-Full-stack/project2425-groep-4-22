import { log } from "console";
import { User } from "types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

const getUserById = async (id: string) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
};

const addUser = async (user: User) => {
    const response = await fetch(`${API_URL}/users/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
    return response.json();
};

const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data = await response.json();
    sessionStorage.setItem('token', data.token);
    return data;
};

const isLoggedIn = (): boolean => {
    return !!sessionStorage.getItem('token');
};

const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to the login page or home page
};

export default { getAllUsers, getUserById, addUser, loginUser, isLoggedIn, logout };