import React from 'react';
import { User } from '../../types';

type Props = {
  user: User;
};

const UserDetails: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{user.userId}</td>
            </tr>
            <tr>
              <td>Firstname:</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td>Lastname:</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      )}
      {user.incomes && (
        <>
          <h3>Incomes</h3>
          <ul>
            {user.incomes.map((income, index) => (
              <li key={index}>
                {income.category}: {income.amount} on {new Date(income.date).toDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
      {user.expenses && (
        <>
          <h3>Expenses</h3>
          <ul>
            {user.expenses.map((expense, index) => (
              <li key={index}>
                {expense.category}: {expense.amount} on {new Date(expense.date).toDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default UserDetails;