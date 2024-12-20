import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Seed Roles
    const adminRole = await prisma.role.upsert({
        where: { name: "Admin" },
        update: {},
        create: {
            name: "Admin",
        },
    });

    const userRole = await prisma.role.upsert({
        where: { name: "User" },
        update: {},
        create: {
            name: "User",
        },
    });



    const user2 = await prisma.user.upsert({
        where: { email: "janedoe@example.com" },
        update: {},
        create: {
            firstname: "Jane",
            lastname: "Doe",
            email: "janedoe@example.com",
            password: "password123", // Consider hashing passwords in production
            role: {
                connect: { id: userRole.id },
            },
        },
    });

    // Seed Income Categories
    const salaryCategory = await prisma.incomeCategory.upsert({
        where: { name: "Salary" },
        update: {},
        create: {
            name: "Salary",
        },
    });

    const freelanceCategory = await prisma.incomeCategory.upsert({
        where: { name: "Freelance" },
        update: {},
        create: {
            name: "Freelance",
        },
    });

    // Seed Expense Categories
    const groceriesCategory = await prisma.expenseCategory.upsert({
        where: { name: "Groceries" },
        update: {},
        create: {
            name: "Groceries",
        },
    });

    const entertainmentCategory = await prisma.expenseCategory.upsert({
        where: { name: "Entertainment" },
        update: {},
        create: {
            name: "Entertainment",
        },
    });



    await prisma.income.create({
        data: {
            amount: 2000.0,
            date: new Date(),
            user: {
                connect: { user_id: user2.user_id },
            },
            category: {
                connect: { id: freelanceCategory.id },
            },
        },
    });

    // Seed Expenses


    await prisma.expense.create({
        data: {
            amount: 150.0,
            date: new Date(),
            user: {
                connect: { user_id: user2.user_id },
            },
            category: {
                connect: { id: entertainmentCategory.id },
            },
        },
    });
}

main()
    .then(() => {
        console.log("Seeding finished.");
    })
    .catch((e) => {
        console.error("Seeding error: ", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
