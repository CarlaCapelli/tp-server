import { Controller, Get, Param, Query } from '@nestjs/common';
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
  @Get('/filter/:estado')
  async findBySearchFilter(@Param('estado') estado: string,@Query('filtro') filtro: string,@Query('filtroPor') filtroPor: string,): Promise<TableView[]> {
    return this.tableService.findBySearchFilter(+estado,filtro,filtroPor);
  }
  @Get('/getall/:estado')
  async findByStatus(@Param('estado') estado: string): Promise<TableView[]> {
    return this.tableService.findByStatus(+estado);
  }

  @Get('getpaged/:estado')
  async getPagedOrders(
    @Param('estado') estado: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) :Promise<{ orders: TableView[]; totalRows: number }>{
    return this.tableService.findPagedOrders(estado, page, pageSize);
  }
}
