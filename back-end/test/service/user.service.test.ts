import userService from '../../service/user.service';
import userRepository from '../../repository/user.db';
import { User } from '../../model/user';
import { UserInput } from '../../types';

// Mock the repositories
jest.mock('../../repository/user.db');

describe('UserService', () => {
    let userData: UserInput;

    beforeEach(() => {
        userData = {
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.smith@example.com',
            password: 'SecurePass123!',
            role: 'user',
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test for getting all users
    test('given: all users in DB, when: getAllUsers is called, then: all users are returned', async () => {
        // Given
        const users: User[] = [
            new User({ firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'SecurePass123!', role: 'user' }),
            new User({ firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', password: 'SecurePass456!', role: 'admin' }),
        ];
        (userRepository.getAllUsers as jest.Mock).mockResolvedValue(users);

        // When
        const result = await userService.getAllUsers();

        // Then
        expect(result).toEqual(users);
    });

    // Test for getting a user by ID
    test('given: id of user existing in DB, when: getUserById is called, then: user is returned', async () => {
        // Given
        const user = new User({ firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'SecurePass123!', role: 'user' });
        (userRepository.getUserById as jest.Mock).mockResolvedValue(user);

        // When
        const result = await userService.getUserById(1);

        // Then
        expect(result).toEqual(user);
    });

    // Test for getting a user by ID - user does not exist
    test('given: id of user not existing in DB, when: getUserById is called, then: an error is thrown', async () => {
        // Given
        (userRepository.getUserById as jest.Mock).mockResolvedValue(undefined);

        // When
        const getUser = async () => await userService.getUserById(1);

        // Then
        await expect(getUser).rejects.toThrowError('User with id 1 does not exist.');
    });

    // Test for adding a new user
    test('given: valid user data, when: addUser is called, then: user is added and returned', async () => {
        // Given
        const user = new User({ firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', password: 'SecurePass123!', role: 'user' });
        (userRepository.addUser as jest.Mock).mockResolvedValue(user);

        // When
        const result = await userService.addUser(userData);

        // Then
        expect(result).toEqual(user);
    });
});