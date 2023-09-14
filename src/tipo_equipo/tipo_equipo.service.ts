import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoEquipoDto } from './dto/tipo_equipo.dto';
import { TipoEquipo } from './entities/tipo_equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TipoEquipoService {
  private tiposEquipo: TipoEquipo[] = [];
  constructor(
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}

  async create(tipoEquipoDto: TipoEquipoDto): Promise<TipoEquipo> {
    try {
      const criterio: FindOneOptions = {
        where: { nombre: tipoEquipoDto.nombre },
      };
      let tipoEquipoExistente: TipoEquipo =
        await this.tipoEquipoRepository.findOne(criterio);
      if (tipoEquipoExistente) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Ya existe un tipo de equipo con este nombre.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      let tipoEquipo: TipoEquipo = await this.tipoEquipoRepository.save(
        new TipoEquipo(tipoEquipoDto.nombre),
      );

      return tipoEquipo;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al crear el tipo de equipo ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<TipoEquipo[]> {
    this.tiposEquipo = await this.tipoEquipoRepository.find();
    return this.tiposEquipo;
  }

  public async findOne(id: number): Promise<TipoEquipo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let tipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne(
        criterio,
      );
      if (!tipoEquipo)
        throw new Error('No se encontro un tipo de equipo con ese ID');
      else return tipoEquipo;
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

  async update(id: number, tipoEquipoDto: TipoEquipoDto): Promise<TipoEquipo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let tipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne(
        criterio,
      );
      if (!tipoEquipo) throw new Error('No se pudo actualizar');
      else {
        tipoEquipo.setNombre(tipoEquipoDto.nombre);
        tipoEquipo = await this.tipoEquipoRepository.save(tipoEquipo);
        return tipoEquipo;
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
      let tipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne(
        criterio,
      );
      if (!tipoEquipo) throw new Error('No se pudo eliminar');
      else {
        await this.tipoEquipoRepository.delete(id);
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
  }
}
