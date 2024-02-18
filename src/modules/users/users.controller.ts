import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Roles(Role.Admin)
    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        return await this.userService.create(createUserDto);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        if (Object.keys(updateUserDto).length === 0) {
            return;
        }

        return await this.userService.update(id, updateUserDto);
    }

    @Roles(Role.Admin)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.userService.delete(id);
    }
}