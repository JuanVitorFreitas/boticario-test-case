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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @Swagger(findAllResponse)
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    findOne(@Param('id', ParseIntPipe) categoria_id: number) {
        return this.categoryService.findOne(categoria_id);
    }

    @Patch(':id')
    @Swagger(updateCategoryResponse)
    update(
        @Param('id', ParseIntPipe) categoria_id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(categoria_id, updateCategoryDto);
    }

    @Delete(':id')
    @Swagger(deleteCategoryResponse)
    remove(@Param('id', ParseIntPipe) categoria_id: number) {
        return this.categoryService.remove(categoria_id);
    }
}
