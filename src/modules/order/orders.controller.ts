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
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @Swagger(findAllResponse)
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    findOne(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.ordersService.findOne(endereco_id);
    }

    @Patch(':id')
    @Swagger(updateOrderResponse)
    update(
        @Param('id', ParseIntPipe) endereco_id: number,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.ordersService.update(endereco_id, updateOrderDto);
    }

    @Delete(':id')
    @Swagger(deleteOrderResponse)
    remove(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.ordersService.remove(endereco_id);
    }
}
