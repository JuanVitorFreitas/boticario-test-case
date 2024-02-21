-- CreateTable
CREATE TABLE "ProdutoPedido" (
    "produto_pedido_id" SERIAL NOT NULL,
    "qtd_produto_pedido" INTEGER,
    "preco_produto_pedido" INTEGER,
    "produto_id" INTEGER NOT NULL,
    "pedido_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoPedido_produto_pedido_id_key" ON "ProdutoPedido"("produto_pedido_id");

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("pedido_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
