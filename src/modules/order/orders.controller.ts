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
    createOrderResponse,
    deleteOrderResponse,
    findAllResponse,
    findOneResponse,
    updateOrderResponse,
} from '../../resources/swagger/order-responses.options';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Order')
@ApiBearerAuth('access-token')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @Swagger(createOrderResponse)
    @ApiOperation({ summary: 'Create an order on DB' })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all orders registred in DB' })
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one order by ID' })
    findOne(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.ordersService.findOne(endereco_id);
    }

    @Patch(':id')
    @Swagger(updateOrderResponse)
    @ApiOperation({ summary: 'Update an order using parameter ID' })
    update(
        @Param('id', ParseIntPipe) endereco_id: number,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.ordersService.update(endereco_id, updateOrderDto);
    }

    @Delete(':id')
    @Swagger(deleteOrderResponse)
    @ApiOperation({ summary: 'Delete an order by ID' })
    remove(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.ordersService.remove(endereco_id);
    }
}
