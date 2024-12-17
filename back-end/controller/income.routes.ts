import express, { Request, Response, NextFunction } from 'express';
import incomeRepository from '../repository/income.db';
import userRepository from '../repository/user.db';
import { IncomeInput } from '../types/index';

export const incomeRouter = express.Router();

/**
 * @swagger
 * /incomes:
 *   get:
 *     summary: Get all incomes
 *     responses:
 *       200:
 *         description: All incomes were successfully collected
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Income'
 *       500:
 *         description: Internal server error
 */
incomeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomes = await incomeRepository.getAllIncomes();
        res.status(200).json(incomes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /incomes/{id}:
 *   get:
 *     summary: Get an income by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income to get
 *     responses:
 *       200:
 *         description: Income was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal server error
 */
incomeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomeId = parseInt(req.params.id, 10);
        const income = await incomeRepository.getIncomeById(incomeId);
        if (income) {
            res.status(200).json(income);
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /incomes:
 *   post:
 *     summary: Add a new income
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncomeInput'
 *     responses:
 *       201:
 *         description: Income was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Income'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
incomeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomeData: IncomeInput = req.body;

        const user = await userRepository.getUserById({ userId: incomeData.userId });
        if (!user) {
            return res.status(400).json({ message: `User with id ${incomeData.userId} does not exist.` });
        }

        const newIncome = await incomeRepository.addIncome({
            ...incomeData,
            userId: incomeData.userId,
        });
        res.status(201).json(newIncome);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /incomes/{id}:
 *   put:
 *     summary: Update an existing income
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncomeInput'
 *     responses:
 *       200:
 *         description: Income was successfully updated
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal server error
 */
incomeRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomeId = parseInt(req.params.id, 10);
        const updateData: Partial<IncomeInput> = req.body;

        const updatedIncome = await incomeRepository.updateIncome(incomeId, updateData);
        res.status(200).json(updatedIncome);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /incomes/{id}:
 *   delete:
 *     summary: Delete an income by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the income to delete
 *     responses:
 *       204:
 *         description: Income was successfully deleted
 *       404:
 *         description: Income not found
 *       500:
 *         description: Internal server error
 */
incomeRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomeId = parseInt(req.params.id, 10);

        await incomeRepository.deleteIncome(incomeId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default incomeRouter;
