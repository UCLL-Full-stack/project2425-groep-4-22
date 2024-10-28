import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { Role, UserInput } from '../types/index';

const getAllUsers = (): User[] => userRepository.getAllUsers();

const getUserById = (userId: number): User => {
    const user = userRepository.getUserById({ userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);
    return user;
};


const addUser = (UserInput: UserInput) => {
    const newUser = userRepository.addUser(UserInput);
    return newUser;
};

export default { getAllUsers, getUserById, addUser };
