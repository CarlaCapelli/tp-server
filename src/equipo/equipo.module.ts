import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';
import { Equipo } from './entities/equipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from 'src/orden/entities/orden.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature( [
    Equipo,TipoEquipo,Marca,Modelo, Orden
    ] )
    ],
  controllers: [EquipoController],
  providers: [EquipoService]
})
export class EquipoModule {}
