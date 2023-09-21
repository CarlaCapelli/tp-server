import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableView } from './tableView.entity';

@Injectable()
export class TableViewService {
  constructor(
    @InjectRepository(TableView)
    private ordenesRepository: Repository<TableView>,
  ) {}

  async findAll(): Promise<TableView[]> {
    return this.ordenesRepository.find();
  }

  async findByStatus(estado: number): Promise<TableView[]> {
    try {
      const ordenes = await this.ordenesRepository.find({
        where: { estado },
      });
      return ordenes;
    } catch (error) {
      throw error;
    }
  }
}
