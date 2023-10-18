import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TableView } from './tableView.entity';

@Injectable()
export class TableViewService {
  private ordenes: TableView[] = [];
  constructor(
    @InjectRepository(TableView)
    private ordenesRepository: Repository<TableView>,
  ) { }

  async findAll(): Promise<TableView[]> {
    return this.ordenesRepository.find();
  }

  async findByStatus(estado: number): Promise<TableView[]> {
    try {
      this.ordenes = await this.ordenesRepository.find({
        where: { estado }, 
        order: null
      });
      return this.ordenes;
    } catch (error) {
      throw error;
    }
  }

  async findBySearchFilter(
    estado: number,
    filter: string,
    filtroPor: string,
  ): Promise<TableView[]> {
    try {
      if (filtroPor === 'cliente') {
        this.ordenes = await this.ordenesRepository.find({
          where: { estado: estado, nombre: Like(`%${filter}%`) }, 
          order: null
        });
      } else if (filtroPor === 'equipo') {
        this.ordenes = await this.ordenesRepository.find({
          where: [
            { estado: estado, modelo: Like(`%${filter}%`) },
            { estado: estado, marca: Like(`%${filter}%`) }], 
            order: null
        });
      }

      return this.ordenes;
    } catch (error) {
      throw error;
    }
  }
  async findPagedOrders(
    estado: number,
    page: number,
    pageSize: number,
  ): Promise<{ orders: TableView[]; totalRows: number }> {
    try {
      const skip = (page - 1) * pageSize;
      const queryBuilder = this.ordenesRepository.createQueryBuilder('ordenes');
      const [orders, totalRows] = await Promise.all([
        queryBuilder.where({ estado }).skip(skip).take(pageSize).getMany(),
        queryBuilder.where({ estado }).getCount(),
      ]);
      return { orders, totalRows };
    } catch (error) {
      throw error;
    }
  }
}
