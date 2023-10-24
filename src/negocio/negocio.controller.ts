import { Body, Controller, Get,Patch, Post } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { PartialUpdateNegocioDto } from './dto/partial-update-negocio-dto';
import { Negocio } from './entities/negocio.entity';

@Controller('negocio')
export class NegocioController {
    constructor(private readonly negocioService: NegocioService) { }

    @Get()
    find(): Promise<Negocio> {
        return this.negocioService.get();
    };

    @Post()
    create(@Body() createNegocioDto: CreateNegocioDto): Promise<Negocio> {
        return this.negocioService.create(createNegocioDto);
    };

    @Patch()
    update(@Body() updateNegocioDto: PartialUpdateNegocioDto): Promise<Negocio> {
        return this.negocioService.update(updateNegocioDto);
    };
}
