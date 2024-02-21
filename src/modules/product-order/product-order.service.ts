import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';

@Injectable()
export class ProductOrderService {
    constructor(private prisma: PrismaService) {}

    async create({
        qtd_produto_pedido,
        preco_produto_pedido,
        produto_id,
        pedido_id,
    }: CreateProductOrderDto) {
        const productOrder = await this.prisma.produtoPedido.create({
            data: {
                qtd_produto_pedido,
                preco_produto_pedido,
                produto_id,
                pedido_id,
            },
        });

        return productOrder;
    }

    async findAll() {
        const productOrders = await this.prisma.produtoPedido.findMany();

        return productOrders;
    }

    async findOne(produto_pedido_id: number) {
        const productOrder = await this.prisma.produtoPedido.findUnique({
            where: {
                produto_pedido_id,
            },
        });

        if (!productOrder) {
            throw new NotFoundException('product order not found');
        }

        return productOrder;
    }

    async update(
        produto_pedido_id: number,
        updateProductOrderDto: UpdateProductOrderDto
    ) {
        const productOrder = await this.prisma.produtoPedido.findUnique({
            where: {
                produto_pedido_id,
            },
        });

        if (!productOrder) {
            throw new NotFoundException('product order not found');
        }

        await this.prisma.produtoPedido.update({
            where: {
                produto_pedido_id,
            },
            data: updateProductOrderDto,
        });
    }

    async remove(produto_pedido_id: number) {
        const productOrder = await this.prisma.produtoPedido.findUnique({
            where: {
                produto_pedido_id,
            },
        });

        if (!productOrder) {
            throw new NotFoundException('product order not found');
        }

        await this.prisma.produtoPedido.delete({
            where: {
                produto_pedido_id,
            },
        });
    }
}
