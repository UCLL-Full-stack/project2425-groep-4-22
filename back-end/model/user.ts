import { Role } from '../types/index'

export class User {
    readonly userId: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;  // Use Role type instead of enum

    constructor(userId: number, firstName: string, lastName: string, email: string, password: string, role: Role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
