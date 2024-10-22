import express, { Request, Response, NextFunction } from 'express';
import { incomeService } from '../service/income.service';
import { IncomeCategory } from '../types/index';
import { User } from '../model/user';

export const incomeRouter = express.Router();

/**
 * @swagger
 * /incomes:
 *  get:
 *    summary: Get all incomes
 *    responses:
 *       200:
 *          description: All incomes were successfully collected
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Income'
 *       500:
 *          description: Internal server error
 */
incomeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomes = incomeService.getAllIncomes();
        res.status(200).json(await incomes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /incomes/{id}:
 *  get:
 *    summary: Get an income by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the income to get
 *    responses:
 *       200:
 *          description: Income was successfully retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Income'
 *       404:
 *          description: Income not found
 *       500:
 *          description: Internal server error
 */
incomeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incomeId = parseInt(req.params.id, 10);
        const income = incomeService.getIncomeById(incomeId);
        if (income) {
            res.status(200).json(await income);
        } else {
            res.status(404).send('Income not found');
        }
    } catch (error) {
        next(error);
    }
});

