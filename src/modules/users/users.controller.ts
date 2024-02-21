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
import { Swagger } from '../../decorators/swagger.decorator';
import { User, UserPayload } from '../../decorators/user.decorator';
import {
    createUserResponse,
    deleteUserResponse,
    findAllResponse,
    findOneResponse,
    updateUserResponse,
} from '../../resources/swagger/user-responses.options';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @Swagger(createUserResponse)
    @ApiOperation({ summary: 'Create an consumer on DB' })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Patch(':id')
    @Swagger(updateUserResponse)
    @ApiOperation({ summary: 'Update an consumer using parameter ID' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        if (Object.keys(updateUserDto).length === 0) {
            return;
        }

        return await this.userService.update(id, updateUserDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all consumers registred in DB' })
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one consumer by ID' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOne(id);
    }

    @Delete(':id')
    @Swagger(deleteUserResponse)
    @ApiOperation({ summary: 'Delete an consumer by ID' })
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
