import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create({ nome_categoria, descricao_categoria }: CreateCategoryDto) {
        const category = await this.prisma.categoria.create({
            data: {
                nome_categoria,
                descricao_categoria,
            },
        });
        return category;
    }

    async findAll() {
        const categories = await this.prisma.categoria.findMany();

        return categories;
    }

    async findOne(categoria_id: number) {
        const category = await this.prisma.categoria.findUnique({
            where: {
                categoria_id,
            },
        });

        if (!category) {
            throw new NotFoundException('category not found');
        }

        return category;
    }

    async update(categoria_id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.prisma.categoria.findUnique({
            where: {
                categoria_id,
            },
        });

        if (!category) {
            throw new NotFoundException('category not found');
        }

        await this.prisma.categoria.update({
            where: {
                categoria_id,
            },
            data: updateCategoryDto,
        });
    }

    async remove(categoria_id: number) {
        const category = await this.prisma.categoria.findUnique({
            where: {
                categoria_id,
            },
        });

        if (!category) {
            throw new NotFoundException('category not found');
        }

        await this.prisma.categoria.delete({
            where: {
                categoria_id,
            },
        });
    }
}
