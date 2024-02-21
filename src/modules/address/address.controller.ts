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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Swagger } from '../../decorators/swagger.decorator';
import {
    createAddressResponse,
    deleteAddressResponse,
    findAllResponse,
    findOneResponse,
    updateAddressResponse,
} from '../../resources/swagger/address-responses.options';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@ApiTags('Address')
@ApiBearerAuth('access-token')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    @Swagger(createAddressResponse)
    @ApiOperation({ summary: 'Create an address on DB' })
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressService.create(createAddressDto);
    }

    @Get()
    @Swagger(findAllResponse)
    @ApiOperation({ summary: 'Return all addresses registred in DB' })
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    @Swagger(findOneResponse)
    @ApiOperation({ summary: 'Return one address by ID' })
    findOne(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.addressService.findOne(endereco_id);
    }

    @Patch(':id')
    @Swagger(updateAddressResponse)
    @ApiOperation({ summary: 'Update an address using parameter ID' })
    update(
        @Param('id', ParseIntPipe) endereco_id: number,
        @Body() updateAddressDto: UpdateAddressDto
    ) {
        return this.addressService.update(endereco_id, updateAddressDto);
    }

    @Delete(':id')
    @Swagger(deleteAddressResponse)
    @ApiOperation({ summary: 'Delete an address by ID' })
    remove(@Param('id', ParseIntPipe) endereco_id: number) {
        return this.addressService.remove(endereco_id);
    }
}
