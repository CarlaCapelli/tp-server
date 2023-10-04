import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Modelo } from './entities/modelo.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modelo,
      Equipo, Marca, TipoEquipo
    ])
  ],
  controllers: [ModeloController],
  providers: [ModeloService]
})
export class ModeloModule { }
