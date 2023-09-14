import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEquipoService } from './tipo_equipo.service';
import { TipoEquipoDto } from './dto/tipo_equipo.dto';
import { TipoEquipo } from './entities/tipo_equipo.entity';


@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}

  @Post()
  create(@Body() tipoEquipoDto: TipoEquipoDto):Promise<TipoEquipo> {
    return this.tipoEquipoService.create(tipoEquipoDto);
  }

  @Get()
  findAll() : Promise<TipoEquipo[]>{
    return this.tipoEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TipoEquipo> {
    return this.tipoEquipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tipoEquipoDto: TipoEquipoDto): Promise<TipoEquipo> {
    return this.tipoEquipoService.update(+id, tipoEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.tipoEquipoService.remove(+id);
  }
}
