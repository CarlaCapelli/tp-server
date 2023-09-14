import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [Marca,
 Modelo
    ] )
    ],
  controllers: [MarcaController],
  providers: [MarcaService]
})
export class MarcaModule {}
