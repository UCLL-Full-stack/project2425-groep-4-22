export type Role = 'admin' | 'user';

export type IncomeCategory = 'Salary' | 'Investment' | 'Other';

export type ExpenseCategory = 'Groceries' | 'Rent' | 'Utilities' | 'Other';

export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  incomes?: Income[];
  expenses?: Expense[];
}

export interface Income {
  incomeId?: number;
  category: IncomeCategory;
  amount: number;
  userId: number;
  date: Date;
}

export interface Expense {
  expenseId?: number;
  category: ExpenseCategory;
  amount: number;
  userId: number;
  date: Date;
}