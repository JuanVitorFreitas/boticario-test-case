import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}
    async create({
        nome_produto,
        descricao_produto,
        preco_produto,
        qtd_estoque,
        imagem,
        categoria_id,
    }: CreateProductDto) {
        const product = await this.prisma.produto.create({
            data: {
                nome_produto,
                descricao_produto,
                preco_produto,
                qtd_estoque,
                imagem,
                categoria_id,
            },
        });
        return product;
    }

    async findAll() {
        const products = await this.prisma.produto.findMany();

        return products;
    }

    async findOne(produto_id: number) {
        const product = await this.prisma.produto.findUnique({
            where: {
                produto_id,
            },
        });

        if (!product) {
            throw new NotFoundException('product not found');
        }

        return product;
    }

    async update(produto_id: number, updateProductDto: UpdateProductDto) {
        const product = await this.prisma.produto.findUnique({
            where: {
                produto_id,
            },
        });

        if (!product) {
            throw new NotFoundException('product not found');
        }

        await this.prisma.produto.update({
            where: {
                produto_id,
            },
            data: updateProductDto,
        });
    }

    async remove(produto_id: number) {
        const product = await this.prisma.produto.findUnique({
            where: {
                produto_id,
            },
        });

        if (!product) {
            throw new NotFoundException('product not found');
        }

        await this.prisma.produto.delete({
            where: {
                produto_id,
            },
        });
    }
}
