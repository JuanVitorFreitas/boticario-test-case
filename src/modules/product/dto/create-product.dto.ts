import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsOptional()
    @IsString()
    nome_produto?: string;

    @IsOptional()
    @IsString()
    descricao_produto?: string;

    @IsOptional()
    @IsInt()
    preco_produto?: number;

    @IsOptional()
    @IsInt()
    qtd_estoque?: number;

    @IsOptional()
    imagem?: string;

    @IsInt()
    @Min(1)
    categoria_id: number;
}
