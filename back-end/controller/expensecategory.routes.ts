import express, { Request, Response, NextFunction } from 'express';
import expenseCategoryService from '../service/expensecategory.service';

export const expenseCategoryRouter = express.Router();

/**
 * @swagger
 * /expense-categories:
 *   get:
 *     summary: Get all expense categories
 *     responses:
 *       200:
 *         description: All expense categories were successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseCategory'
 *       500:
 *         description: Internal server error
 */
expenseCategoryRouter.get('/', async (req: Request, res: Response) => {
    try {
        const expenseCategories = await expenseCategoryService.getAllExpenseCategories();
        res.json(expenseCategories);
    } catch (error) {
        console.error('Error fetching expense categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /expense-categories/{id}:
 *   get:
 *     summary: Get an expense category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expense category to get
 *     responses:
 *       200:
 *         description: Expense category was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: Expense category not found
 *       500:
 *         description: Internal server error
 */
expenseCategoryRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const expenseCategory = await expenseCategoryService.getExpenseCategoryById(id);
        if (!expenseCategory) {
            return res.status(404).json({ error: 'Expense category not found' });
        }
        res.json(expenseCategory);
    } catch (error) {
        console.error('Error fetching expense category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /expense-categories:
 *   post:
 *     summary: Add a new expense category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseCategoryInput'
 *     responses:
 *       201:
 *         description: Expense category was successfully added
 *       500:
 *         description: Internal server error
 */
expenseCategoryRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newExpenseCategory = await expenseCategoryService.addExpenseCategory(name);
        res.status(201).json(newExpenseCategory);
    } catch (error) {
        console.error('Error adding expense category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /expense-categories/{id}:
 *   put:
 *     summary: Update an expense category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expense category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseCategoryInput'
 *     responses:
 *       200:
 *         description: Expense category was successfully updated
 *       500:
 *         description: Internal server error
 */
expenseCategoryRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;
        const updatedExpenseCategory = await expenseCategoryService.updateExpenseCategory(id, name);
        res.json(updatedExpenseCategory);
    } catch (error) {
        console.error('Error updating expense category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /expense-categories/{id}:
 *   delete:
 *     summary: Delete an expense category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expense category to delete
 *     responses:
 *       204:
 *         description: Expense category was successfully deleted
 *       500:
 *         description: Internal server error
 */
expenseCategoryRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await expenseCategoryService.deleteExpenseCategory(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting expense category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

