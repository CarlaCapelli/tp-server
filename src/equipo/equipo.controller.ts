import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete} from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto } from './dto/equipo.dto';
import { CreateEquipoDto } from './dto/createEquipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get()
  findAll() {
    return this.equipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() equipoDto: EquipoDto) {
    return this.equipoService.update(+id, equipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoService.remove(+id);
  }
}
