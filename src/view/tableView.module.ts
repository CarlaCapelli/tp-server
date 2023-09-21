import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableView } from './tableView.entity';
import { TableViewController } from './tableView.controller';
import { TableViewService } from './tableView.service';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableView,Equipo,Cliente])],
  controllers: [TableViewController],
  providers: [TableViewService],
})
export class TableViewModule {}