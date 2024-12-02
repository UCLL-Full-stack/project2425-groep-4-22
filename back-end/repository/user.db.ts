import { User } from '../model/user';


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

        // Use the already mapped `User.from`
        return usersPrisma.map(User.from);
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Database error. See server log for details.');
    }
};



/* const getUserById = ({ userId }: { userId: number }): User | null => {
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
 */
export default {
    getAllUsers,
    /* getUserById,
    addUser, */
};
