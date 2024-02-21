import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrorCodes } from '../../constants';
import { PrismaService } from '../../prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async create({
        cliente_id,
        bairro,
        cep,
        cidade,
        complemento,
        numero,
        rua,
        uf,
    }: CreateAddressDto) {
        const address = await this.prisma.endereco.create({
            data: {
                cep,
                rua,
                bairro,
                cidade,
                numero,
                complemento,
                uf,
                cliente_id,
            },
        });

        return address;
    }

    async findAll() {
        const adresses = await this.prisma.endereco.findMany();

        return adresses;
    }

    async findOne(endereco_id: number) {
        const address = await this.prisma.endereco.findUnique({
            where: {
                endereco_id,
            },
        });

        if (!address) {
            throw new NotFoundException('address not found');
        }

        return address;
    }

    async update(endereco_id: number, updateAddressDto: UpdateAddressDto) {
        const address = await this.prisma.endereco.findUnique({
            where: {
                endereco_id,
            },
        });

        if (!address) {
            throw new NotFoundException('address not found');
        }

        await this.prisma.endereco.update({
            where: {
                endereco_id,
            },
            data: updateAddressDto,
        });
    }

    async remove(endereco_id: number) {
        try {
            await this.prisma.endereco.delete({
                where: {
                    endereco_id,
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
