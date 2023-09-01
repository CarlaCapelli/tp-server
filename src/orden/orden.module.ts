import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { ClienteController } from 'src/cliente/cliente.controller';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden]),TypeOrmModule.forFeature([Cliente])],
  controllers: [OrdenController, ClienteController],
  providers: [OrdenService, ClienteService]
})
export class OrdenModule {}
