import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableView } from './tableView.entity';
import { TableViewService } from './tableView.service';

@Controller('ordenes')
export class TableViewController {
  constructor(private readonly tableService: TableViewService) {}

  @Get()
  async findAll(): Promise<TableView[]> {
    return this.tableService.findAll();
  }

  @Get(':estado')
  async findByStatus(@Param('estado') estado: string): Promise<TableView[]> {
    return this.tableService.findByStatus(+estado);
  }
}
