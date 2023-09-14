import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto } from './dto/equipo.dto';


@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(
    @Body('equipoDto') equipoDto: EquipoDto,
    @Body('modeloID') modeloID: number,
    @Body('tipoEquipoID') tipoEquipoID: number,
  ) {
    return this.equipoService.create(equipoDto, modeloID, tipoEquipoID);
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
