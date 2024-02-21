/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "Cliente" (
    "client_id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "senha" TEXT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "endereco_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_id" SERIAL NOT NULL,
    "nome_categoria" TEXT,
    "descricao_categoria" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "endereco_id" SERIAL NOT NULL,
    "cep" TEXT,
    "rua" TEXT,
    "bairo" TEXT,
    "cidade" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "uf" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("endereco_id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "pedido_id" SERIAL NOT NULL,
    "numero_pedido" INTEGER,
    "valor_total_pedido" INTEGER,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN,
    "cliente_id" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
