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

 
}