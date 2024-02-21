/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `client_id` on the `Cliente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_cliente_id_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "client_id",
ADD COLUMN     "cliente_id" SERIAL NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cliente_id");

-- CreateTable
CREATE TABLE "Produto" (
    "produto_id" SERIAL NOT NULL,
    "nome_produto" TEXT,
    "descricao_produto" TEXT,
    "preco_produto" INTEGER,
    "qtd_estoque" INTEGER,
    "data_cadastro_produto" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "imagem" TEXT,
    "categoria_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_produto_id_key" ON "Produto"("produto_id");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;
