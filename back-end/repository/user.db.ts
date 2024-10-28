import { User } from '../model/user';
import { Income } from '../model/income';
import { Expense } from '../model/expense';
import { Role, IncomeCategory, ExpenseCategory, UserInput } from '../types/index';

const users = [
    new User({
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'admin' as Role
    }),
    new User({
        userId: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        role: 'user' as Role
    })
];


const income1 = new Income({
    incomeId: 1,
    category: 'Salary' as IncomeCategory,
    amount: 5000,
    date: new Date('2023-01-01')
});

const income2 = new Income({
    incomeId: 2,
    category: 'Investment' as IncomeCategory,
    amount: 2000,
    date: new Date('2023-02-01')
});

const expense1 = new Expense({
    expenseId: 1,
    category: 'Rent' as ExpenseCategory,
    amount: 1500,
    date: new Date('2023-01-01')
});

const expense2 = new Expense({
    expenseId: 2,
    category: 'Groceries' as ExpenseCategory,
    amount: 300,
    date: new Date('2023-02-01')
});


users[0].addIncome(income1);
users[1].addIncome(income2);

users[0].addExpense(expense1);
users[1].addExpense(expense2);


const getAllUsers = (): User[] => users;


const getUserById = ({ userId }: { userId: number }): User | null => {
    try {
        return users.find((user) => user.getUserId() === userId) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const addUser = (userData: UserInput): User => {
    const newUserId = users.length + 1;
    const newUser = new User({
        userId: newUserId,
        ...userData
    });
    users.push(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    addUser,
};
