import { IsNotEmpty, IsString } from 'class-validator';

export class SigInDto {
    @IsString()
    cpf: string;

    @IsNotEmpty()
    @IsString()
    senha: string;
}
