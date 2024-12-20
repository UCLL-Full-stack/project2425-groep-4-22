import { User } from '../model/user';
import { UserInput } from '../types/index';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                incomes: {
                    include: { category: true }, // Include income categories
                },
                expenses: {
                    include: { category: true }, // Include expense categories
                },
            },
        });

        // Map the database results to `User` instances
        return usersPrisma.map(userPrisma =>
            User.from({
                ...userPrisma,
                incomes: userPrisma.incomes || [],
                expenses: userPrisma.expenses || []
            })
        );
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Database error while fetching users.');
    }
};

const getUserById = async ({ userId }: { userId: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { user_id: userId },
            include: {
                incomes: {
                    include: { category: true }, // Include income categories
                },
                expenses: {
                    include: { category: true }, // Include expense categories
                },
            },
        });

        if (!userPrisma) return null;

        // Map the database result to a `User` instance
        return User.from({
            ...userPrisma,
            incomes: userPrisma.incomes || [],
            expenses: userPrisma.expenses || []
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Database error while fetching user by ID.');
    }
};

const addUser = async (userData: UserInput): Promise<User> => {
    try {
        // Ensure the role exists
        const roleExists = await database.role.findUnique({
            where: { id: userData.role },
        });

        if (!roleExists) {
            throw new Error(`Role with id ${userData.role} does not exist.`);
        }

        // Create the new user in the database
        const newUserPrisma = await database.user.create({
            data: {
                firstname: userData.firstName,
                lastname: userData.lastName,
                email: userData.email,
                password: userData.password,
                role: {
                    connect: {
                        id: userData.role,
                    },
                },
            },
        });

        // Map the created user to a `User` instance
        return User.from({
            ...newUserPrisma,
            incomes: [], // Newly created user has no incomes yet
            expenses: [], // Newly created user has no expenses yet
        });
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Database error while adding user.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
            include: {
                incomes: {
                    include: { category: true }, // Include income categories
                },
                expenses: {
                    include: { category: true }, // Include expense categories
                },
            },
        });

        if (!userPrisma) return null;

        // Map the database result to a `User` instance
        return User.from({
            ...userPrisma,
            incomes: userPrisma.incomes || [],
            expenses: userPrisma.expenses || [],
        });
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Database error while fetching user by email.');
    }
};

export default {
    getUserByEmail,
    getAllUsers,
    getUserById,
    addUser,
};
