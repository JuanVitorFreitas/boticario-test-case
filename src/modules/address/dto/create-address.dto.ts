import { IsInt, IsString, Min } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    cep?: string;

    @IsString()
    rua?: string;

    @IsString()
    bairro?: string;

    @IsString()
    cidade?: string;

    @IsString()
    numero?: string;

    @IsString()
    complemento?: string;

    @IsString()
    uf?: string;

    @IsInt()
    @Min(1)
    cliente_id: number;
}
