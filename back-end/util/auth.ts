import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};
