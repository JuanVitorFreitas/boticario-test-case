/*
  Warnings:

  - You are about to drop the column `bairo` on the `Endereco` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "bairo",
ADD COLUMN     "bairro" TEXT;
