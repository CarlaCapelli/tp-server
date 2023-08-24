import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Marca } from './entities/marca.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [Marca,
   Equipo
    ] )
    ],
  controllers: [MarcaController],
  providers: [MarcaService]
})
export class MarcaModule {}
