import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    private readonly logger = new Logger(UsersService.name);

    async create(data: CreateUserDto) {
        try {
            const user = await this.prisma.user.create({
                data,
            });
            return user;
        } catch (err) {
            throw err;
        }
    };

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ) {
        const { name, password, phoneNumber, role, status } = updateUserDto;
        const user = await this.prisma.user.findFirst({
            where: {
                id
            },
            select: {
                email: true,
                name: true,
                status: true,
            }
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        try {
            await this.prisma.$transaction(async (prisma) => {
                await prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                        password,
                        phoneNumber,
                        role,
                        status,
                    }
                });
            })
        } catch (err) {
            throw err
        }
    };

    async findByEmail(
        email: string,
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                password: true,
                id: true,
                role: true,
            }
        })
        return user;
    };

    async findAll() {
        const user = await this.prisma.user.findMany({
            select: {
                email: true,
                password: true,
                id: true,
                role: true,
            }
        })
        return user;
    };

    async delete(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                email: true,
                name: true,
                role: true,
                status: true,
            }
        });

        if (!user) {
            return;
        }

        try {
            await this.prisma.$transaction(async (prisma) => {
                await prisma.user.delete({
                    where: {
                        id,
                    }
                })
            })
        } catch (err) {
            throw err;
        }
    }
}
