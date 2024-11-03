// Import the required dependencies
import { Role } from '../../types';
import { User } from '../../model/user';

// Valid variables for user
let userId: number;
let firstName: string;
let lastName: string;
let email: string;
let password: string;
let role: Role;

beforeEach(() => {
    // Data for valid user
    userId = 1;
    firstName = 'Alice';
    lastName = 'Smith';
    email = 'alice.smith@example.com';
    password = 'SecurePass123!';
    role = 'user';
});

// Test creating a user - valid data
test('given: valid value for all fields, when: user is created, then: user is created', () => {
    // given

    // when
    const user: User = new User({
        userId,
        firstName,
        lastName,
        email,
        password,
        role,
    });

    // then
    expect(user.getUserId()).toEqual(userId);
    expect(user.getFirstName()).toEqual(firstName);
    expect(user.getLastName()).toEqual(lastName);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
});

// Test creating a user - missing first name
test('given: missing first name, when: user is created, then: error is thrown', () => {
    // given
    const missingFirstName: string = '' as string;

    // when
    const createUser = () => new User({
        userId,
        firstName: missingFirstName,
        lastName,
        email,
        password,
        role,
    });

    // then
    expect(createUser).toThrowError('First name is required.');
});

// Test creating a user - missing last name
test('given: missing last name, when: user is created, then: error is thrown', () => {
    // given
    const missingLastName: string = '' as string;

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName: missingLastName,
        email,
        password,
        role,
    });

    // then
    expect(createUser).toThrowError('Last name is required.');
});

// Test creating a user - missing email
test('given: missing email, when: user is created, then: error is thrown', () => {
    // given
    const missingEmail: string = '' as string;

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName,
        email: missingEmail,
        password,
        role,
    });

    // then
    expect(createUser).toThrowError('Email is required.');
});

// Test creating a user - invalid email format
test('given: invalid email format, when: user is created, then: error is thrown', () => {
    // given
    const invalidEmail: string = 'invalid-email';

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName,
        email: invalidEmail,
        password,
        role,
    });

    // then
    expect(createUser).toThrowError('Invalid email format.');
});

// Test creating a user - missing password
test('given: missing password, when: user is created, then: error is thrown', () => {
    // given
    const missingPassword: string = '' as string;

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName,
        email,
        password: missingPassword,
        role,
    });

    // then
    expect(createUser).toThrowError('Password is required.');
});

// Test creating a user - short password
test('given: short password, when: user is created, then: error is thrown', () => {
    // given
    const shortPassword: string = 'short';

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName,
        email,
        password: shortPassword,
        role,
    });

    // then
    expect(createUser).toThrowError('Password must be at least 8 characters long.');
});

// Test creating a user - missing role
test('given: missing role, when: user is created, then: error is thrown', () => {
    // given
    const missingRole: Role = '' as Role;

    // when
    const createUser = () => new User({
        userId,
        firstName,
        lastName,
        email,
        password,
        role: missingRole,
    });

    // then
    expect(createUser).toThrowError('Role is required.');
});