import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Seed Roles
    const adminRole = await prisma.role.upsert({
        where: { name: "Admin" },
        update: {},
        create: { name: "Admin" },
    });

    const userRole = await prisma.role.upsert({
        where: { name: "User" },
        update: {},
        create: { name: "User" },
    });

    // Hash passwords for admin and user
    const adminPassword = await bcrypt.hash("admin", 10);
    const userPassword = await bcrypt.hash("user", 10);

    // Seed Admin User
    const adminUser = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            firstname: "Admin",
            lastname: "User",
            email: "admin@example.com",
            password: adminPassword,
            role: {
                connect: { id: adminRole.id },
            },
        },
    });

    // Seed Regular User
    const regularUser = await prisma.user.upsert({
        where: { email: "user@example.com" },
        update: {},
        create: {
            firstname: "Regular",
            lastname: "User",
            email: "user@example.com",
            password: userPassword,
            role: {
                connect: { id: userRole.id },
            },
        },
    });

    // Seed Income Categories
    await prisma.incomeCategory.upsert({
        where: { name: "Salary" },
        update: {},
        create: { name: "Salary" },
    });

    const freelanceCategory = await prisma.incomeCategory.upsert({
        where: { name: "Freelance" },
        update: {},
        create: { name: "Freelance" },
    });

    // Seed Expense Categories
    const entertainmentCategory = await prisma.expenseCategory.upsert({
        where: { name: "Entertainment" },
        update: {},
        create: { name: "Entertainment" },
    });

    // Seed Income for Regular User
    await prisma.income.create({
        data: {
            amount: 2000.0,
            date: new Date(),
            user: {
                connect: { user_id: regularUser.user_id },
            },
            category: {
                connect: { id: freelanceCategory.id },
            },
        },
    });

    // Seed Expenses for Regular User
    await prisma.expense.create({
        data: {
            amount: 150.0,
            date: new Date(),
            user: {
                connect: { user_id: regularUser.user_id },
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
