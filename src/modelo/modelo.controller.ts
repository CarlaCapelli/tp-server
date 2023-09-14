import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloDto } from './dto/modelo.dto';
import { Marca } from 'src/marca/entities/marca.entity';

@Controller('modelo')
export class ModeloController {
  constructor(private readonly modeloService: ModeloService) {}

  @Post()
  create(@Body('modeloDto') createModeloDto: ModeloDto,@Body('marca')marcaID:number) {
    return this.modeloService.create(createModeloDto,marcaID);
  }

  @Get()
  findAll() {
    return this.modeloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() modeloDto: ModeloDto) {
    return this.modeloService.update(+id, modeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloService.remove(+id);
  }
}
