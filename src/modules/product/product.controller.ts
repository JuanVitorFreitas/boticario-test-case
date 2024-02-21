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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth('access-token')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) produto_id: number) {
        return this.productService.findOne(produto_id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) produto_id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.update(produto_id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) produto_id: number) {
        return this.productService.remove(produto_id);
    }
}
