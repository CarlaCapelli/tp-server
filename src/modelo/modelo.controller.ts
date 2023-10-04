import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloDto } from './dto/modelo.dto';
import { CreateModeloDto } from './dto/createModelo.dto';
import { SearchModelosDto } from './dto/searchModelos.dto';

@Controller('modelo')
export class ModeloController {
  constructor(private readonly modeloService: ModeloService) {}

  @Post()
  create(@Body() createModeloDto: CreateModeloDto) {
    return this.modeloService.create(createModeloDto);
  };

  @Get('search')
  findModelos(@Query() searchModelosDto: SearchModelosDto) {
    return this.modeloService.searchModelos(searchModelosDto);
  };

  @Get()
  findAll() {
    return this.modeloService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloService.findOne(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() modeloDto: ModeloDto) {
    return this.modeloService.update(+id, modeloDto);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloService.remove(+id);
  };

}
