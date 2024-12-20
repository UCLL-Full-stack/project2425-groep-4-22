export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
  roleId?: number;
  incomes?: Income[];
  expenses?: Expense[];
}

export interface Role {
  id: number;
  name: string;
  users?: User[];
}

export interface Income {
  incomeId: number;
  category: string;
  amount: number;
  date:string;
  userId?: number;
}

export interface Expense {
  expenseId: any;
  category: string;
  amount: number;
  date: string;
  userId?: number;
}

export interface IncomeCategory {
  id: number;
  name: string;
  incomes?: Income[];
}

export interface ExpenseCategory {
  id: number;
  name: string;
  expenses?: Expense[];
}