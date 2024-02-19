import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    Scope,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { PrismaErrorCodes } from '../../constants';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private readonly logger = new Logger(UsersService.name);

    async create(data: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const { createdAt, email, id, name, phoneNumber, role, status } =
                await this.prisma.user.create({
                    data: { ...data, password: hashedPassword },
                });
            return { createdAt, email, id, name, phoneNumber, role, status };
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === PrismaErrorCodes.UniqueConstraintFailed) {
                    const target = err.meta?.target as string[] | undefined;
                    if (target?.includes('email')) {
                        throw new ConflictException('duplicated-email');
                    }
                    if (target?.includes('phoneNumber')) {
                        throw new ConflictException('duplicated-phone-number');
                    }
                }
            }
            throw err;
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { name, password, phoneNumber, role, status } = updateUserDto;
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                email: true,
                name: true,
                status: true,
            },
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
                    },
                });
            });
        } catch (err) {
            throw err;
        }
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                password: true,
                id: true,
                role: true,
                status: true,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                email: true,
                name: true,
                phoneNumber: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    async findAll() {
        const user = await this.prisma.user.findMany({
            select: {
                email: true,
                name: true,
                createdAt: true,
                phoneNumber: true,
                status: true,
                updatedAt: true,
                id: true,
                role: true,
            },
        });
        return user;
    }

    async delete(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
