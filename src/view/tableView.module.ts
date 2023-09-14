// src/orden/orden.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Importa el servicio
import { TableView } from './tableView.entity';
import { TableViewController } from './tableView.controller';
import { TableViewService } from './tableView.service';

@Module({
  imports: [TypeOrmModule.forFeature([TableView])],
  controllers: [TableViewController],
  providers: [TableViewService], // Registra el servicio
})
export class TableViewModule {}