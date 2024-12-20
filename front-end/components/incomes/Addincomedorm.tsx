import React, { useState, useEffect } from 'react';
import incomeCategoryService from '../../service/incomeCategoryService'; // Adjust the import path as needed
import incomeService from '../../service/incomeService'; // Adjust the import path as needed
import userService from '../../service/userService'; // Assuming you have a userService to fetch users
import { Income, User } from '../../types';

const AddIncomeForm: React.FC<{ onClose: () => void; onIncomeAdded: () => void }> = ({
    onClose,
    onIncomeAdded,
}) => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
        userId: '',
    });
    const [error, setError] = useState<string | null>(null);

    // Fetch categories and users on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await incomeCategoryService.getAllIncomeCategories();
                setCategories(fetchedCategories); // Assuming categories have { id, name }
            } catch (err) {
                setError('Failed to fetch income categories.');
            }
        };

        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.getAllUsers();
                setUsers(fetchedUsers); // Assuming users have { userId, firstName, lastName }
            } catch (err) {
                setError('Failed to fetch users.');
            }
        };

        fetchCategories();
        fetchUsers();
    }, []);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.category || !formData.date || !formData.userId) {
            setError('Amount, category, date, and user are required.');
            return;
        }

        try {
            const payload: Income = {
                category: formData.category, // Send category ID
                amount: parseFloat(formData.amount), // Convert amount to a float
                date: new Date(formData.date).toISOString(), // Convert Date to 'YYYY-MM-DDTHH:mm:ss.sssZ' string format
                userId: parseInt(formData.userId), // Convert userId to number
                incomeId: 0,
            };

            await incomeService.addIncome(payload);
            onIncomeAdded(); // Notify the parent
            onClose(); // Close the popup
        } catch (err) {
            setError('Failed to save income. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Add Income</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                            User
                        </label>
                        <select
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>
                                Select a user
                            </option>
                            {users.map((user) => (
                                <option key={user.userId} value={user.userId}>
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIncomeForm;