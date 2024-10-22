
import { User } from '../model/user';

class UserRepository {
    private users: User[] = [];

    constructor() {
        // Initialize with two test users
        this.users.push(new User(1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'));
        this.users.push(new User(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password456', 'user'));
    }

    // Get all users
    getAllUsers(): User[] {
        return this.users;
    }

    // Get a user by ID
    getUserById(userId: number): User | undefined {
        return this.users.find(user => user.userId === userId);
    }
}

export const userRepository = new UserRepository();

export { UserRepository };