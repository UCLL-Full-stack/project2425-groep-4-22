/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         groups:
 *           type: array
 *           items:
 *             type: string
 *           description: The groups the user belongs to
 *         incomes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Income'
 *           description: The incomes of the user
 *         expenses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Expense'
 *           description: The expenses of the user
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         groups:
 *           type: array
 *           items:
 *             type: string
 *           description: The groups the user belongs to
 *         incomes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IncomeInput'
 *           description: The incomes of the user
 *         expenses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExpenseInput'
 *           description: The expenses of the user
 */

import express, { NextFunction, Request, Response } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

export const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: All users were successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: User was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User was successfully added
 *       500:
 *         description: Internal server error
 */


userRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        await userService.addUser(userInput);
        res.status(201).json({ message: 'User was successfully added' });
    } catch (error) {
        next(error);
    }
}); 
