import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateProductOrderDto {
    @IsInt()
    @IsOptional()
    qtd_produto_pedido?: number;

    @IsInt()
    @IsOptional()
    preco_produto_pedido?: number;

    @IsInt()
    @Min(1)
    produto_id: number;

    @IsInt()
    @Min(1)
    pedido_id: number;
}
