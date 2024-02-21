import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ProductOrderController } from './product-order.controller';
import { ProductOrderService } from './product-order.service';

@Module({
    controllers: [ProductOrderController],
    providers: [ProductOrderService, PrismaService],
})
export class ProductOrderModule {}
