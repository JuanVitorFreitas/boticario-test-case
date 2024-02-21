import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsOptional()
    @IsString()
    nome_categoria?: string;

    @IsOptional()
    @IsString()
    descricao_categoria?: string;
}
