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
    createProductResponse,
    deleteProductResponse,
    findAllResponse,
    findOneResponse,
    updateProductResponse,
} from '../../resources/swagger/product-responses.options';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth('access-token')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @Swagger(createProductResponse)
    @ApiOperation({ summary: 'Create an product on DB' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all products registred in DB' })
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one product by ID' })
    findOne(@Param('id', ParseIntPipe) produto_id: number) {
        return this.productService.findOne(produto_id);
    }

    @Patch(':id')
    @Swagger(updateProductResponse)
    @ApiOperation({ summary: 'Update an product using parameter ID' })
    update(
        @Param('id', ParseIntPipe) produto_id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.update(produto_id, updateProductDto);
    }

    @Delete(':id')
    @Swagger(deleteProductResponse)
    @ApiOperation({ summary: 'Delete an product by ID' })
    remove(@Param('id', ParseIntPipe) produto_id: number) {
        return this.productService.remove(produto_id);
    }
}
