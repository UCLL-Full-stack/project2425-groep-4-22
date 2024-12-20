import React, { useState, useEffect } from 'react';
import expenseCategoryService from '../../service/expenseCategoryService'; // Adjust the import path as needed
import expenseService from '../../service/expenseService'; // Adjust the import path as needed
import { Expense } from '../../types';
import { getUserIdFromToken } from 'src/utils';

const AddExpenseForm: React.FC<{ onClose: () => void; onExpenseAdded: () => void }> = ({
    onClose,
    onExpenseAdded,
}) => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
    });
    const [error, setError] = useState<string | null>(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await expenseCategoryService.getAllExpenseCategories();
                setCategories(fetchedCategories); // Assuming categories have { id, name }
            } catch (err) {
                setError('Failed to fetch expense categories.');
            }
        };

        fetchCategories();
    }, []);

    
    

    const userId = getUserIdFromToken();

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.category || !formData.date || !userId) {
            setError('Amount, category, date, and user are required.');
            return;
        }

        try {
            const payload: Expense = {
                category: formData.category, // Send category ID
                amount: parseFloat(formData.amount), // Convert amount to a float
                date: new Date(formData.date).toISOString(), // Convert Date to 'YYYY-MM-DDTHH:mm:ss.sssZ' string format
                userId: userId, // Use the extracted user ID
                expenseId: 0,
            };

            await expenseService.addExpense(payload);
            onExpenseAdded(); // Notify the parent
            onClose(); // Close the popup
        } catch (err) {
            setError('Failed to save expense. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
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

export default AddExpenseForm;