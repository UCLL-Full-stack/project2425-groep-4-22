import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types/index';

const getAllUsers = async (): Promise<User[]> => userRepository.getAllUsers();

const getUserById = async (userId: number): Promise<User> => {
    const user = await userRepository.getUserById({ userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);
    return user;
};

const addUser = async (userInput: UserInput): Promise<User> => {
    const newUser = await userRepository.addUser(userInput);
    return newUser;
};

export default { getAllUsers, getUserById, addUser };