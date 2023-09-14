import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { ClienteController } from 'src/cliente/cliente.controller';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EquipoService } from 'src/equipo/equipo.service';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Cliente, Equipo, Modelo, TipoEquipo])],
  controllers: [OrdenController, ClienteController],
  providers: [OrdenService, ClienteService, EquipoService]
})
export class OrdenModule {}
