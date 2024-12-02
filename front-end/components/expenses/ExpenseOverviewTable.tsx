import React from 'react';
import { useRouter } from 'next/router';
import { Expense } from '../../types/index';

type Props = {
  expenses: Array<Expense>;
  selectExpense: (expense: Expense) => void;
};

const ExpenseOverviewTable: React.FC<Props> = ({ expenses, selectExpense }: Props) => {
  const router = useRouter();

  const handleExpenseClick = (expense: Expense) => {
    selectExpense(expense);
    router.push(`/expenses/${expense.expenseId}`);
  };

  return (
    <>
      {expenses && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr key={index} onClick={() => handleExpenseClick(expense)} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{expense.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ExpenseOverviewTable;