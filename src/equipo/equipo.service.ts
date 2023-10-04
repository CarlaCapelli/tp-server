import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EquipoDto } from './dto/equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';
import { CreateEquipoDto } from './dto/createEquipo.dto';

@Injectable()
export class EquipoService {
  private equipos: Equipo[] = [];
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}
  
  async create(
    createEquipoDto: CreateEquipoDto,
   
  ): Promise<Equipo> {
    try {
      let criterioModelo: FindOneOptions = { where: { id: createEquipoDto.modeloID } };
      let modelo = await this.modeloRepository.findOne(criterioModelo);
      let criterioTipoEquipo: FindOneOptions = { where: { id: createEquipoDto.tipoEquipoID } };
      let tipoEquipo = await this.tipoEquipoRepository.findOne(
        criterioTipoEquipo,
      );
      if (modelo && tipoEquipo) {
        let nuevoEquipo = new Equipo(createEquipoDto.n_serie);
        nuevoEquipo.modelo = modelo;

        let equipo: Equipo = await this.equipoRepository.save(nuevoEquipo);
        if (!equipo) throw new Error('No se pudo agregar el equipo');
        else return equipo;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al crear el equipo ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Equipo[]> {
    const criterio: FindManyOptions = {
      relations: ['modelo', 'modelo.marca', 'tipoEquipo'],
    };
    this.equipos = await this.equipoRepository.find(criterio);
    return this.equipos;
  }

  public async findOne(id: number): Promise<Equipo> {
    try {
      const criterio: FindOneOptions = {
        where: { id: id },
        relations: ['modelo', 'modelo.marca', 'modelo.tipoEquipo'],
      };
      let equipo: Equipo = await this.equipoRepository.findOne(criterio);
      if (!equipo) throw new Error('No se encontro un equipo con ese ID');
      else return equipo
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en encontrar el ID ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, equipoDto: EquipoDto): Promise<Equipo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterio);
      if (!equipo)  throw new Error('No se pudo actualizar');
       else  { equipo.setNSerie(equipoDto.n_serie);
      equipo = await this.equipoRepository.save(equipo);
      return equipo;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al actualizar ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterio);
      if (!equipo) throw new Error('No se pudo eliminar');
      else {
        await this.equipoRepository.delete(id);
        return true;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al eliminar ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  };
}
