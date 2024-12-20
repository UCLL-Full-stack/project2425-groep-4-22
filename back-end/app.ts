import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { incomeRouter } from './controller/income.routes';
import { expenseRouter } from './controller/expense.routes';
import { incomecategorieRouter } from './controller/incomecategory.routes';
import { expenseCategoryRouter } from './controller/expensecategory.routes';
import { expressjwt } from 'express-jwt';
import { unless } from 'express-unless';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;



app.use(
    cors({
        origin: 'http://localhost:8080', // Adjust based on your frontend's origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);
app.use(bodyParser.json());

app.use(expressjwt({
    secret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })(),
    algorithms: ['HS256']
}).unless({ path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/add'] })
)


app.use('/users', userRouter);
app.use('/incomes', incomeRouter);
app.use('/expenses', expenseRouter);
app.use('/income-categorys', incomecategorieRouter);
app.use('/expense-categorys', expenseCategoryRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation for the application',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./controller/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});