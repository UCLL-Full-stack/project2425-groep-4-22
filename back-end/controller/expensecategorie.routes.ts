import express, { Request, Response, NextFunction } from 'express';
import expensecategorieService from '../service/expensecategorie.service';

const router = express.Router();

/**
 * @swagger
 * /categories/expense:
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
router.get('/categories/expense', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await expensecategorieService.getAllExpenseCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/expense/{id}:
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
router.get('/categories/expense/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const category = await expensecategorieService.getExpenseCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Expense category not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/expense:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/categories/expense', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Category name is required' });
            return;
        }
        const newCategory = await expensecategorieService.addExpenseCategory(name);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/expense/{id}:
 *   delete:
 *     summary: Delete an expense category
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
 *       404:
 *         description: Expense category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/categories/expense/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        await expensecategorieService.deleteExpenseCategory(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
