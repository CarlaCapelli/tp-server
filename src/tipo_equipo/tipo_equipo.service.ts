import { Injectable } from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo_equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo_equipo.dto';
import { TipoEquipo } from './entities/tipo_equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoEquipoService {
  private tiposEquipo: TipoEquipo[] = [];
  constructor(
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}

  create(createTipoEquipoDto: CreateTipoEquipoDto) {
    return 'This action adds a new tipoEquipo';
  }

  public async findAll() {
    this.tiposEquipo=await this.tipoEquipoRepository.find();
    return this.tiposEquipo;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEquipo`;
  }

  update(id: number, updateTipoEquipoDto: UpdateTipoEquipoDto) {
    return `This action updates a #${id} tipoEquipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEquipo`;
  }
}
