import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Modelo } from './entities/modelo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [Modelo,
   Equipo
    ] )
    ],
  controllers: [ModeloController],
  providers: [ModeloService]
})
export class ModeloModule {}
