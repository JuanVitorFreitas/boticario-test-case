import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorators/role.decorator';
import { Swagger } from '../../decorators/swagger.decorator';
import { User, UserPayload } from '../../decorators/user.decorator';
import { Role } from '../../enums/roles.enum';
import {
    createUserResponse,
    deleteUserResponse,
    findAllResponse,
    findOneResponse,
    updateUserResponse,
} from '../../resources/swagger/responses.options';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Roles(Role.Admin)
    @Post()
    @Swagger(createUserResponse)
    @ApiOperation({ summary: 'Create an user on DB' })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Roles(Role.Admin)
    @Patch(':id')
    @Swagger(updateUserResponse)
    @ApiOperation({ summary: 'Update an user using parameter ID' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        if (Object.keys(updateUserDto).length === 0) {
            return;
        }

        return await this.userService.update(id, updateUserDto);
    }

    @Roles(Role.Admin)
    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all users registred in DB' })
    async findAll() {
        return await this.userService.findAll();
    }

    @Roles(Role.Admin)
    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one user by ID' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOne(id);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    @Swagger(deleteUserResponse)
    @ApiOperation({ summary: 'Delete on user by ID' })
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @User() payload: UserPayload
    ) {
        if (payload.id === id) {
            throw new ForbiddenException();
        }
        return await this.userService.delete(id);
    }
}
