import bcrypt from 'bcrypt';
import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types/index';

import { expenseCategoryRouter } from '../controller/expensecategory.routes';
import { Expense } from '../model/expense';
import { Income } from '../model/income';
import { generateJwtToken } from '../util/jwt';
import { authenticateUser } from '../util/auth';

const getAllUsers = async (): Promise<User[]> => userRepository.getAllUsers();

const getUserById = async (userId: number): Promise<User> => {
    const user = await userRepository.getUserById({ userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);
    return user;
};


const roleMap: Record<number, string> = {
    1: 'Admin',
    2: 'User',
};

const authenticate = async (email: string, password: string): Promise<AuthenticationResponse> => {
    // Fetch user from the database
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    // Verify password (assuming bcrypt or similar is used)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid password');
    }

    // Generate a token
    const token = generateJwtToken({
        userId: user.userId!, // Assuming this is your user's unique ID
        email: user.email,
        role: roleMap[user.role],

    });

    // Return the full response with all required fields
    return {
        token,
        firstname: user.firstName,
        lastname: user.lastName,
        role: roleMap[user.role],
        userid: user.userId,
        email: user.email, // Include email here
    };
};


const addUser = async (userInput: UserInput): Promise<User> => {
    const { firstName, lastName, email, password, role } = userInput;

    // Check if a user with the same email already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
        throw new Error(`User with email ${email} is already registered.`);
    }

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 12);

    // Map to the required DTO structure as needed by repository
    const newUserData = {

        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,

    };


    const savedUserData = await userRepository.addUser(newUserData);


    const user = User.from({
        user_id: savedUserData.userId || 0,
        firstname: savedUserData.firstName,
        lastname: savedUserData.lastName,
        email: savedUserData.email,
        password: savedUserData.password,
        roleId: savedUserData.role,
        incomes: [], // Newly created user has no incomes yet
        expenses: [], // Newly created user has no expenses yet
    });

    return user;
};



const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.getUserByEmail(email);
};

const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to the login page or home page
};






export default { getAllUsers, getUserById, addUser, authenticate, getUserByEmail, logout };


