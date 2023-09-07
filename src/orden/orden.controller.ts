import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenDto } from './dto/orden.dto';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post('new')
  create(@Body('ordenDto') ordenDto: OrdenDto, @Body('id_cliente') id_cliente:number) {
    return this.ordenService.create(ordenDto,id_cliente);
  }

  @Get()
  findAll() {
    return this.ordenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: OrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  }

  @Patch(':id/estado')
  changeEstado(@Param('id') id: string) {
    return this.ordenService.changeEstado(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  }
}
