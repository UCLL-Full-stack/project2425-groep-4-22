
import incomecategorieService from '../service/incomecategory.service';
import express, { Request, Response, NextFunction } from 'express';

export const incomecategorieRouter = express.Router();

/**
 * @swagger
 * /income-categories:
 *   get:
 *     summary: Get all income categories
 *     responses:
 *       200:
 *         description: All income categories were successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IncomeCategory'
 *       500:
 *         description: Internal server error
 */
incomecategorieRouter.get('/', async (req: Request, res: Response) => {
    try {
        const incomeCategories = await incomecategorieService.getAllIncomeCategories();
        res.json(incomeCategories);
    } catch (error) {
        console.error('Error fetching income categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /income-categories/{id}:
 *   get:
 *     summary: Get an income category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income category to get
 *     responses:
 *       200:
 *         description: Income category was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IncomeCategory'
 *       404:
 *         description: Income category not found
 *       500:
 *         description: Internal server error
 */
incomecategorieRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const incomeCategory = await incomecategorieService.getIncomeCategoryById(id);
        if (!incomeCategory) {
            return res.status(404).json({ error: 'Income category not found' });
        }
        res.json(incomeCategory);
    } catch (error) {
        console.error('Error fetching income category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /income-categories:
 *   post:
 *     summary: Add a new income category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncomeCategoryInput'
 *     responses:
 *       201:
 *         description: Income category was successfully added
 *       500:
 *         description: Internal server error
 */
incomecategorieRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newIncomeCategory = await incomecategorieService.addIncomeCategory(name);
        res.status(201).json(newIncomeCategory);
    } catch (error) {
        console.error('Error adding income category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /income-categories/{id}:
 *   put:
 *     summary: Update an income category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncomeCategoryInput'
 *     responses:
 *       200:
 *         description: Income category was successfully updated
 *       500:
 *         description: Internal server error
 */
incomecategorieRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;
        const updatedIncomeCategory = await incomecategorieService.updateIncomeCategory(id, name);
        res.json(updatedIncomeCategory);
    } catch (error) {
        console.error('Error updating income category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /income-categories/{id}:
 *   delete:
 *     summary: Delete an income category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income category to delete
 *     responses:
 *       204:
 *         description: Income category was successfully deleted
 *       500:
 *         description: Internal server error
 */
incomecategorieRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await incomecategorieService.deleteIncomeCategory(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting income category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

