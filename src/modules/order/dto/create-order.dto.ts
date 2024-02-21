import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateOrderDto {
    @IsOptional()
    @IsInt()
    numero_pedido?: number;

    @IsOptional()
    @IsInt()
    valor_total_pedido?: number;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsInt()
    @Min(1)
    cliente_id: number;
}
