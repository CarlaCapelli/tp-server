import { Module } from '@nestjs/common';
import { TipoEquipoService } from './tipo_equipo.service';
import { TipoEquipoController } from './tipo_equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { TipoEquipo } from './entities/tipo_equipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [TipoEquipo,
   Equipo
    ] )
    ],
  controllers: [TipoEquipoController],
  providers: [TipoEquipoService]
})
export class TipoEquipoModule {}
