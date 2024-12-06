import { User } from '../model/user';
import { UserInput } from '../types/index';
import database from './database.db';

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

        // Use the already mapped `User.from`
        return usersPrisma.map(User.from);
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ userId }: { userId: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id: userId },
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
        return User.from({
            ...userPrisma,
            incomes: userPrisma.incomes || [],
            expenses: userPrisma.expenses || []
        });
    } catch (error) {
        console.error('Database error. See server log for details.', error);
        throw new Error('Database error. See server log for details.');
    }
};

const addUser = async (userData: UserInput): Promise<User> => {
    try {
        const newUserPrisma = await database.user.create({
            data: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password,
                role: {
                    connect: {
                        id: userData.roleId // Ensure this is an Int or fetch the correct ID beforehand
                    }
                }
            }
        });

        return User.from({
            ...newUserPrisma,
            incomes: [],
            expenses: []
        });
    } catch (error) {

        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllUsers,
    getUserById,
    addUser,
};