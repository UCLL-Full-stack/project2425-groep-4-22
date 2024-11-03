import { User } from "types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

const getUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/users/${id}`);
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

export default { getAllUsers, getUserById, addUser };