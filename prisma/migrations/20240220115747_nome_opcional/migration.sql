/*
  Warnings:

  - Added the required column `cliente_id` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "nome" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "cliente_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;
