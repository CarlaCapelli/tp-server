import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';

@Module({
    imports: [TypeOrmModule.forFeature([Negocio])],
  controllers: [NegocioController],
  providers: [NegocioService]
})
export class NegocioModule {}
