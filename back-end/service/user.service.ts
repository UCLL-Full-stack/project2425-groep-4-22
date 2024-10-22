import { UserInput } from '../types/index';
import { User } from '../model/user';
import { UserRepository } from '../repository/user.db';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Get all users
    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    }

    // Get a user by ID
    getUserById(userId: number): User | undefined {
        return this.userRepository.getUserById(userId);
    }


}

