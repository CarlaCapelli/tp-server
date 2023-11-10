import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/cliente.dto';
import { PartialUpdateClienteDto } from './dto/partial-update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: ClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: PartialUpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: number) {
    try {
      await this.clienteService.remove(id);
      return true;
    } catch (error) {
      if (error.message === 'CLIENTE_EN_USO') {
        throw new NotFoundException('ERROR_CLIENTE_EN_USO');
      }
      throw error;
    }
  }
}
