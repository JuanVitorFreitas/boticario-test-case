import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { Role } from '../../../enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    name: string;

    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @ApiProperty({
        description: 'User Role',
        enum: Role
    })
    role: Role;

    /**
  * É necessário informar um telefone juntamente com DDD
  * @example 11999999999
  */
    @Length(11)
    phoneNumber: string;

}