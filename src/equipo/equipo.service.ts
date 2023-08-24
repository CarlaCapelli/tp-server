import { Injectable } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class EquipoService {
  private equipos: Equipo[] = [];
  constructor(
    @InjectRepository(Equipo)
    private readonly ciudadRepository: Repository<Equipo>,
  ) {}
  create(createEquipoDto: CreateEquipoDto) {
    return 'This action adds a new equipo';
  }

  async findAll(): Promise<Equipo[]> {
    const criterio: FindManyOptions = {
      relations: ['marca', 'modelo', 'tipoEquipo'],
    };
    this.equipos = await this.ciudadRepository.find(criterio);
    return this.equipos;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipo`;
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }
}
