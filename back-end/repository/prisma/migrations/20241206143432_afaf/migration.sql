/*
  Warnings:

  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expense_id` on the `Expense` table. All the data in the column will be lost.
  - The primary key for the `Income` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `income_id` on the `Income` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_pkey",
DROP COLUMN "expense_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Income" DROP CONSTRAINT "Income_pkey",
DROP COLUMN "income_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Income_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
