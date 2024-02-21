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
    createProductOrderResponse,
    deleteProductOrderResponse,
    findAllResponse,
    findOneResponse,
    updateProductOrderResponse,
} from '../../resources/swagger/product-order-responses.options';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { ProductOrderService } from './product-order.service';

@Controller('product-order')
@ApiTags('Product Order')
@ApiBearerAuth('access-token')
export class ProductOrderController {
    constructor(private readonly productOrderService: ProductOrderService) {}

    @Post()
    @Swagger(createProductOrderResponse)
    @ApiOperation({ summary: 'Create an product order on DB' })
    create(@Body() createProductOrderDto: CreateProductOrderDto) {
        return this.productOrderService.create(createProductOrderDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all product order registred in DB' })
    findAll() {
        return this.productOrderService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one product order by ID' })
    findOne(@Param('id', ParseIntPipe) produto_pedido_id: number) {
        return this.productOrderService.findOne(produto_pedido_id);
    }

    @Patch(':id')
    @Swagger(updateProductOrderResponse)
    @ApiOperation({ summary: 'Update an product order using parameter ID' })
    update(
        @Param('id', ParseIntPipe) produto_pedido_id: number,
        @Body() updateProductOrderDto: UpdateProductOrderDto
    ) {
        return this.productOrderService.update(
            produto_pedido_id,
            updateProductOrderDto
        );
    }

    @Delete(':id')
    @Swagger(deleteProductOrderResponse)
    @ApiOperation({ summary: 'Delete an product order by ID' })
    remove(@Param('id', ParseIntPipe) produto_pedido_id: number) {
        return this.productOrderService.remove(produto_pedido_id);
    }
}
