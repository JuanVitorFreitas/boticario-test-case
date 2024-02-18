import { IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserStatus } from '../../../enums/userStatus.enum';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}