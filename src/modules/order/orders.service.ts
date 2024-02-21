import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async create({
        numero_pedido,
        valor_total_pedido,
        status,
        cliente_id,
    }: CreateOrderDto) {
        const order = await this.prisma.pedido.create({
            data: {
                numero_pedido,
                valor_total_pedido,
                status,
                cliente_id,
            },
        });
        return order;
    }

    async findAll() {
        const orders = await this.prisma.pedido.findMany();

        return orders;
    }

    async findOne(pedido_id: number) {
        const order = await this.prisma.pedido.findUnique({
            where: {
                pedido_id,
            },
        });

        if (!order) {
            throw new NotFoundException('order not found');
        }

        return order;
    }

    async update(pedido_id: number, updateOrderDto: UpdateOrderDto) {
        const order = await this.prisma.pedido.findUnique({
            where: {
                pedido_id,
            },
        });

        if (!order) {
            throw new NotFoundException('order not found');
        }

        await this.prisma.pedido.update({
            where: {
                pedido_id,
            },
            data: updateOrderDto,
        });
    }

    async remove(pedido_id: number) {
        const order = await this.prisma.pedido.findUnique({
            where: {
                pedido_id,
            },
        });

        if (!order) {
            throw new NotFoundException('order not found');
        }

        await this.prisma.pedido.delete({
            where: {
                pedido_id,
            },
        });
    }
}
