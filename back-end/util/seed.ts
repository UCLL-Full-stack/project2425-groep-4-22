import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Add categories
    const foodCategory = await prisma.category.create({
        data: {
            name: 'Food',
        },
    });

    const salaryCategory = await prisma.category.create({
        data: {
            name: 'Salary',
        },
    });

    const utilitiesCategory = await prisma.category.create({
        data: {
            name: 'Utilities',
        },
    });

    // Add users
    const user1 = await prisma.user.create({
        data: {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            password: 'securepassword',
        },
    });

    // Add income
    await prisma.income.create({
        data: {
            categoryName: salaryCategory.name,
            amount: 5000.0,
            date: new Date('2024-01-01'),
            userId: user1.user_id,
        },
    });

    await prisma.income.create({
        data: {
            categoryName: salaryCategory.name,
            amount: 4500.0,
            date: new Date('2024-01-15'),
            userId: user2.user_id,
        },
    });

    // Add expenses
    await prisma.expense.create({
        data: {
            categoryName: foodCategory.name,
            amount: 150.0,
            date: new Date('2024-01-02'),
            userId: user1.user_id,
        },
    });

    await prisma.expense.create({
        data: {
            categoryName: utilitiesCategory.name,
            amount: 200.0,
            date: new Date('2024-01-03'),
            userId: user2.user_id,
        },
    });

    console.log('Database has been seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
