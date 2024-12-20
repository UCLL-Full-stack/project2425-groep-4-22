import { ExpenseCategory, IncomeCategory } from "@prisma/client";



export type UserInput = {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
};

export interface AuthenticationResponse {
    token: string;
    firstname: string;
    lastname: string;
    role: string;
    userid: any;
    email: string;
}


export type IncomeInput = {
    category: IncomeCategory;
    amount: number;
    date: Date;
    userId: number;
};



export type ExpenseInput = {
    userId: number;
    category: ExpenseCategory
    amount: number;
    date: Date;
};


