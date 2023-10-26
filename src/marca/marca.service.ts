import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MarcaDto } from './dto/marca.dto';
import { Marca } from './entities/marca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class MarcaService {
  private marcas: Marca[] = [];
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(marcaDto: MarcaDto): Promise<any> {
    const marcaExistente = await this.marcaRepository
      .createQueryBuilder('marca')
      .where('marca.nombre = :nombre', { nombre: marcaDto.nombre })
      .getOne();

    if (marcaExistente) {return {mensaje:"Ya existe marca",creado:false}    }

    try {
      let marca: Marca = await this.marcaRepository.save(
        new Marca(marcaDto.nombre),
      );

      if (!marca){
        throw new Error("No se pudo guardar marca")
      }
      
      return marca;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al crear la marca: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<Marca[]> {
    this.marcas = await this.marcaRepository.find();
    return this.marcas;
  }

  public async findOne(id: number): Promise<Marca> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let marca: Marca = await this.marcaRepository.findOne(criterio);
      if (marca) return marca;
      else throw new Error('No se encontro una marca con ese ID');
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

  async update(id: number, marcaDto: MarcaDto): Promise<Marca> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let marca: Marca = await this.marcaRepository.findOne(criterio);
      if (marca) {
        marca.setNombre(marcaDto.nombre);
        marca = await this.marcaRepository.save(marca);
        return marca;
      } else {
        throw new Error('No se pudo actualizar');
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
      let marca: Marca = await this.marcaRepository.findOne(criterio);
      if (!marca) throw new Error('No se pudo eliminar');
      else {
        await this.marcaRepository.delete(id);
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
