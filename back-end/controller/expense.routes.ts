import express, { NextFunction, Request, Response } from 'express';
import expenseService from '../service/expense.service';
import { ExpenseInput } from '../types/index';

export const expenseRouter = express.Router();

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: All expenses were successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Internal server error
 */
expenseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expense to get
 *     responses:
 *       200:
 *         description: Expense was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */


expenseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenseId = parseInt(req.params.id, 10);
        const expense = await expenseService.getExpenseById(expenseId);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Add a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseInput'
 *     responses:
 *       201:
 *         description: Expense was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

expenseRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenseData: ExpenseInput = req.body;



        const newExpense = await expenseService.addExpense(expenseData);
        res.status(201).json(newExpense);
    } catch (error) {
        next(error);
    }
});

export default expenseRouter;
