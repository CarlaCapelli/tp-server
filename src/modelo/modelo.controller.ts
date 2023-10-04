import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
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
  
  @Post('BrandType')
  findModelos(@Body() searchModelosDto: SearchModelosDto) {
    return this.modeloService.searchModelos(searchModelosDto);
  }

  
  @Get('search') // NO ANDA POR AHORA
  findModelos2(@Query() parametros: SearchModelosDto) {
    const parametro1 = parseFloat(parametros.id_marca);
    const parametro2 = parseFloat(parametros.id_tipo_equipo);
  
    if (isNaN(parametro1) || isNaN(parametro2)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Los parámetros de consulta no son números válidos.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // Utiliza parametros.parametro1 y parametros.parametro2 en tu lógica
    return `Parámetro 1: ${parametros.id_marca}, Parámetro 2: ${parametros.id_tipo_equipo}`;
  }


}
