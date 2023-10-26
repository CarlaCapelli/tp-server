import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { PartialUpdateOrdenDto } from './dto/partial-update-orden.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/common/enum/rol.enum';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post('new')
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenService.create(createOrdenDto);
  };


  @Get()
  findAll() {
    return this.ordenService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  };


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: PartialUpdateOrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  };

 
  @Patch(':id/estado')
  changeEstado(@Param('id') id: string) {
    return this.ordenService.changeEstado(+id);
  };

 
  @Patch(':id/presupuestoNA')
  presupuestoNoAprobado(@Param('id') id: string) {
    return this.ordenService.presupuestoNA(+id);
  };

  @Patch(':id/presupuestarA')
  presupuestoAgain(@Param('id') id: string) {
    return this.ordenService.changeToPresupuestada(+id);
  };

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() res, @Param('id') id: string ) {
    console.log(res.role)
    if (res.user.role != Role.ADMIN){
      return ('No tiene permisos suficientes para acceder a esta funcion')
    }
    return this.ordenService.remove(+id);
  };
}
