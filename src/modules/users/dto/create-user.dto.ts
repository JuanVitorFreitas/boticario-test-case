import { Exclude } from 'class-transformer';
import {
    IsEmail,
    IsISO8601,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @MinLength(6)
    @IsOptional()
    senha?: string;

    @IsString()
    @IsOptional()
    nome?: string;

    @Length(11)
    @IsNotEmpty()
    cpf: string;

    @Length(11)
    @IsPhoneNumber('BR')
    @IsOptional()
    telefone: string;

    @IsISO8601()
    @IsOptional()
    data_nascimento: Date;
}

export class UserDto extends CreateUserDto {
    @Exclude()
    senha: string;
}
