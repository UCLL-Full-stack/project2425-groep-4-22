import React, { useState } from 'react';
import { Expense } from '../../types/index';
import expenseService from '../../service/expenseService'; // Adjust the import path as needed

type Props = {
  expenses: Array<Expense>;
  selectExpense: (expense: Expense) => void;
  onEdit: (expenseId: number) => void;
  onDelete: (updatedExpenses: Array<Expense>) => void; // Update the callback to pass updated expenses
};

const ExpenseOverviewTable: React.FC<Props> = ({ expenses, selectExpense, onEdit, onDelete }: Props) => {
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);

  const handleExpenseClick = (expense: Expense) => {
    selectExpense(expense);
  };

  const handleCheckboxChange = (expenseId: number) => {
    const newSelectedExpenseId = selectedExpenseId === expenseId ? null : expenseId;
    setSelectedExpenseId(newSelectedExpenseId);
  };

  const handleDelete = async () => {
    if (selectedExpenseId) {
      try {
        await expenseService.deleteExpense(selectedExpenseId);
        const updatedExpenses = expenses.filter(expense => expense.expenseId !== selectedExpenseId);
        onDelete(updatedExpenses); // Pass the updated expenses to the parent
        setSelectedExpenseId(null); // Reset the selected expense ID
      } catch (error) {
        console.error('Failed to delete expense:', error);
      }
    }
  };

  return (
    <>
      {expenses && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedExpenseId === expense.expenseId}
                    onChange={() => handleCheckboxChange(expense.expenseId)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleExpenseClick(expense)}>{expense.category}</td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleExpenseClick(expense)}>{expense.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleExpenseClick(expense)}>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleExpenseClick(expense)}>{expense.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedExpenseId && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => onEdit(selectedExpenseId)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default ExpenseOverviewTable;