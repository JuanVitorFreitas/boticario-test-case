import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { PrismaErrorCodes } from '../../constants';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private readonly logger = new Logger(UsersService.name);

    async create({
        cpf,
        data_nascimento,
        email,
        nome,
        senha,
        telefone,
        username,
    }: CreateUserDto) {
        try {
            let pass: string | null = null;
            if (senha) {
                pass = await bcrypt.hash(senha, 10);
            }
            const user = await this.prisma.cliente.create({
                data: {
                    nome,
                    cpf,
                    telefone,
                    data_nascimento,
                    email,
                    senha: pass,
                    username,
                },
            });
            return plainToClass(UserDto, user);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === PrismaErrorCodes.UniqueConstraintFailed) {
                    const target = err.meta?.target as string[] | undefined;
                    if (target?.includes('cpf')) {
                        throw new ConflictException('duplicated-cpf');
                    }
                }
            }
            throw err;
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const { data_nascimento, email, nome, senha, telefone, username } =
                updateUserDto;

            await this.prisma.cliente.update({
                where: {
                    cliente_id: id,
                },
                data: {
                    telefone,
                    username,
                    nome,
                    senha,
                    email,
                    data_nascimento,
                },
            });
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === PrismaErrorCodes.UniqueConstraintFailed) {
                    const target = err.meta?.target as string[] | undefined;
                    if (target?.includes('cpf')) {
                        throw new ConflictException('duplicated-cpf');
                    }
                }
            }
            throw err;
        }
    }

    async findByCpf(cpf: string) {
        const user = await this.prisma.cliente.findUnique({
            where: {
                cpf,
            },
            select: {
                email: true,
                senha: true,
                cliente_id: true,
                nome: true,
                telefone: true,
                username: true,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    async findOne(id: number) {
        const user = await this.prisma.cliente.findFirst({
            where: {
                cliente_id: id,
            },
            select: {
                email: true,
                nome: true,
                telefone: true,
                username: true,
                cpf: true,
                createdAt: true,
                updatedAt: true,
                data_nascimento: true,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    async findAll() {
        const user = await this.prisma.cliente.findMany({
            select: {
                email: true,
                nome: true,
                telefone: true,
                username: true,
                cpf: true,
                createdAt: true,
                updatedAt: true,
                data_nascimento: true,
                cliente_id: true,
            },
        });
        return user;
    }

    async delete(id: number) {
        try {
            await this.prisma.cliente.delete({
                where: {
                    cliente_id: id,
                },
            });
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === PrismaErrorCodes.ForeignKeyConstraintFailed) {
                    const fieldName = err.meta?.field_name as string;
                    throw new ConflictException(
                        `Foreign key constraint on field ${fieldName}`
                    );
                }
            }
            throw err;
        }
    }
}
