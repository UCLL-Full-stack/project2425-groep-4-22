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

export default { getAllUsers, getUserById };