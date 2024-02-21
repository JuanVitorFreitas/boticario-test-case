import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Swagger } from '../../decorators/swagger.decorator';
import {
    createCategoryResponse,
    deleteCategoryResponse,
    findAllResponse,
    findOneResponse,
    updateCategoryResponse,
} from '../../resources/swagger/category-responses.options';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth('access-token')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @Swagger(createCategoryResponse)
    @ApiOperation({ summary: 'Create an category on DB' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all categories registred in DB' })
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one category by ID' })
    findOne(@Param('id', ParseIntPipe) categoria_id: number) {
        return this.categoryService.findOne(categoria_id);
    }

    @Patch(':id')
    @Swagger(updateCategoryResponse)
    @ApiOperation({ summary: 'Update an category using parameter ID' })
    update(
        @Param('id', ParseIntPipe) categoria_id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(categoria_id, updateCategoryDto);
    }

    @Delete(':id')
    @Swagger(deleteCategoryResponse)
    @ApiOperation({ summary: 'Delete an category by ID' })
    remove(@Param('id', ParseIntPipe) categoria_id: number) {
        return this.categoryService.remove(categoria_id);
    }
}
