import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EquipoDto } from './dto/equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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
  ) { }

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    try {
      let criterioModelo: FindOneOptions = { where: { id: createEquipoDto.modeloID } };
      let modelo = await this.modeloRepository.findOne(criterioModelo);
      if (!modelo) {
        throw new Error('No se pudo encontrar el modelo para el equipo')
      } else { // Si encuentra el modelo
        /// Si encuentra un equipo con el mismo modelo y numero de serie elije ese
        if (createEquipoDto.n_serie != null) { // Si createEquipoDTO tiene nSerie nulo, omite la busqueda
          let criterioNSerie: FindOneOptions = { where: { modelo:{id: createEquipoDto.modeloID}, n_serie: createEquipoDto.n_serie } };
          let equipoSearch = await this.equipoRepository.findOne(criterioNSerie)

          if (equipoSearch) { // Si logra encontrarlo
            return equipoSearch
          }
        }
        /// Si no se encuentra un equipo con el mismo numero de serie y modelo, lo crea
        let nuevoEquipo = new Equipo(createEquipoDto.n_serie);
        nuevoEquipo.modelo = modelo;

        let equipoSaved: Equipo = await this.equipoRepository.save(nuevoEquipo);
        if (!equipoSaved) {
          throw new Error('No se pudo guardar el equipo');
        }
        return equipoSaved
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
  };

  async findAll(): Promise<Equipo[]> {
    const criterio: FindManyOptions = {
      relations: ['modelo', 'modelo.marca', 'modelo.tipoEquipo'],
    };
    this.equipos = await this.equipoRepository.find(criterio);
    return this.equipos;
  };

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
  };

  async update(id: number, equipoDto: EquipoDto): Promise<Equipo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterio);
      if (!equipo) throw new Error('No se encontro equipo');
      else {
        equipo.setNSerie(equipoDto.n_serie);
        let equipoSave = await this.equipoRepository.save(equipo);
        if (!equipoSave) {
          throw new Error("No se pudo actualizar en base de datos")
        } else {
          return equipo;
        }
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
  };

  async remove(id: number): Promise<boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterio);
      if (!equipo) throw new Error('No se encontro equipo a eliminar');
      else {
        let deleteStatus = await this.equipoRepository.delete(id);
        if (!deleteStatus) {
          throw new Error("No se borro equipo en base de datos")
        } else {
          return true;
        }
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  };
}
