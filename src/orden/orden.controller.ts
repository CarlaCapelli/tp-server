import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { PartialUpdateOrdenDto } from './dto/partial-update-orden.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/common/enum/rol.enum';
import { RolesGuard } from 'src/auth/role/role.guard';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) { }

  // NUEVA ORDEN
  @Post('new')
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenService.create(createOrdenDto);
  };

  // OBTENER ORDENES
  @Get()
  findAll() {
    return this.ordenService.findAll();
  };

  // OBTENER DATOS DE UNA SOLA ORDEN
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  };

  // OBTENER ORDENES DE UN CLIENTE
  @Get('/cliente/:id')
  getOrdenes(@Param('id') id: string) {
    return this.ordenService.findOrdenesCliente(+id)
  }

  // MODIFICAR UNA ORDEN
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: PartialUpdateOrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  };

  // MODIFICAR EL ESTADO DE UNA ORDEN
  @Patch(':id/estado')
  changeEstado(@Param('id') id: string) {
    return this.ordenService.changeEstado(+id);
  };

  // SIN REPARACION
  @Patch(':id/sinReparacion')
  sinReparacion(@Param('id') id: string) {
    return this.ordenService.sinReparacion(+id);
  };

  // PRESUPUESTO NO APROBADO
  @Patch(':id/presupuestoNA')
  presupuestoNoAprobado(@Param('id') id: string) {
    return this.ordenService.presupuestoNA(+id);
  };

  // PRESUPUESTO APROBADO
  @Patch(':id/presupuestarA')
  presupuestoAgain(@Param('id') id: string) {
    return this.ordenService.changeToPresupuestada(+id);
  };

  // ELIMINAR ORDEN (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  };

  // RESTAURAR ORDEN (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.ordenService.restore(+id);
  };
}
