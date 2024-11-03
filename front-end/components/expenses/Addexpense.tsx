import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../types';
import expenseService from '../../service/expenseService';

type Props = {
  onExpenseAdded: () => void;
};

const AddExpenseForm: React.FC<Props> = ({ onExpenseAdded }: Props) => {
  const [expenseInput, setExpenseInput] = useState<Expense>({
    category: 'Groceries' as ExpenseCategory,
    amount: 0,
    userId: 0,
    date: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseInput((prev) => ({
      ...prev,
      [name]: name === 'userId' || name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await expenseService.addExpense(expenseInput);
      onExpenseAdded();
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Add Expense</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={expenseInput.category}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        >
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          name="amount"
          value={expenseInput.amount}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">User ID</label>
        <input
          type="text"
          name="userId"
          value={expenseInput.userId}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={expenseInput.date.toISOString().split('T')[0]}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;