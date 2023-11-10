import { Body, Controller, Get,Patch, Post, UseGuards } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { PartialUpdateNegocioDto } from './dto/partial-update-negocio-dto';
import { Negocio } from './entities/negocio.entity';
import { Role } from 'src/common/enum/rol.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';


@Controller('negocio')
export class NegocioController {
    constructor(private readonly negocioService: NegocioService) { }

    // OBTENER LA INFORMACION DEL NEGOCIO
    @Get()
    find(): Promise<Negocio> {
        return this.negocioService.get();
    };

    // CREAR LA INFORMACION DEL NEGOCIO ( SOLO ADMIN )
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createNegocioDto: CreateNegocioDto): Promise<Negocio> {
        return this.negocioService.create(createNegocioDto);
    };

    // MODIFICAR NEGOCIO (SOLO ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch()
    update(@Body() updateNegocioDto: PartialUpdateNegocioDto): Promise<Negocio> {
        return this.negocioService.update(updateNegocioDto);
    };
}