import jwt from 'jsonwebtoken';

const generateJwtToken = (user: { userId: number; email: string; role: string }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const payload = {
        userId: user.userId,
        email: user.email,
        role: user.role,
    };

    const options = {
        expiresIn: process.env.JWT_EXPIRES_HOURS,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export { generateJwtToken };
