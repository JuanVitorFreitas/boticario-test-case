import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';
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

    @Length(13)
    phoneNumber: string;

}