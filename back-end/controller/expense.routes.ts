/**
 * @swagger
 *  components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Expense:
 *         type: object
 *         properties:
 *           expenseId:
 *             type: integer
 *             description: The ID of the expense
 *           category:
 *             type: string
 *             description: The category of the expense
 *           amount:
 *             type: number
 *             description: The amount of the expense
 *           date:
 *             type: string
 *             format: date
 *             description: The date of the expense
 *           user:
 *             $ref: '#/components/schemas/User'
 *       ExpenseInput:
 *         type: object
 *         properties:
 *           category:
 *             type: string
 *             description: The category of the expense
 *           amount:
 *             type: number
 *             description: The amount of the expense
 *           date:
 *             type: string
 *             format: date
 *             description: The date of the expense
 *           user:
 *             $ref: '#/components/schemas/UserInput'
 */

import express, { NextFunction, Request, Response } from 'express';
import { expenseService } from '../service/expense.service';
import { ExpenseCategory } from '../types/index';
import { User } from '../model/user';

export const expenseRouter = express.Router();

/**
 * @swagger
 * /expenses:
 *  get:
 *    summary: Get all expenses
 *    responses:
 *       200:
 *          description: All expenses were successfully collected
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Expense'
 *       500:
 *          description: Internal server error
 */
expenseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenses = expenseService.getAllExpenses();
        res.status(200).json(await expenses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /expenses/{id}:
 *  get:
 *    summary: Get an expense by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the expense to get
 *    responses:
 *       200:
 *          description: Expense was successfully retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Expense'
 *       404:
 *          description: Expense not found
 *       500:
 *          description: Internal server error
 */
expenseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenseId = parseInt(req.params.id, 10);
        const expense = expenseService.getExpenseById(expenseId);
        if (expense) {
            res.status(200).json(await expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        next(error);
    }
});

