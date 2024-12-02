import React from 'react';
import { User } from '../../types';

type Props = {
  user: User;
};

const UserDetails: React.FC<Props> = ({ user }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {user && (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ID:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userId}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Firstname:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lastname:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">E-mail:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Role:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
            </tr>
          </tbody>
        </table>
      )}
      {user.incomes && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Incomes</h3>
          <ul className="list-disc pl-5 space-y-2">
            {user.incomes.map((income, index) => (
              <li key={index} className="text-sm text-gray-700">
                {income.category}: {income.amount} on {new Date(income.date).toDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.expenses && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses</h3>
          <ul className="list-disc pl-5 space-y-2">
            {user.expenses.map((expense, index) => (
              <li key={index} className="text-sm text-gray-700">
                {expense.category}: {expense.amount} on {new Date(expense.date).toDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;