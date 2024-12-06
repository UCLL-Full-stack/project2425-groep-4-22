import express, { Request, Response, NextFunction } from 'express';
import incomecategorieService from '../service/incomecategorie.service';


const router = express.Router();

/**
 * @swagger
 * /categories/income:
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
router.get('/categories/income', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await incomecategorieService.getAllIncomeCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/income/{id}:
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
router.get('/categories/income/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const category = await incomecategorieService.getIncomeCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Income category not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/income:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IncomeCategory'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/categories/income/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Category name is required' });
            return;
        }
        const newCategory = await incomecategorieService.addIncomeCategory(name);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categories/income/{id}:
 *   delete:
 *     summary: Delete an income category
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
 *       404:
 *         description: Income category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/categories/income/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        await incomecategorieService.deleteIncomeCategory(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;