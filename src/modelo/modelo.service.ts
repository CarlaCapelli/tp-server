import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ModeloDto } from './dto/modelo.dto';
import { Modelo } from './entities/modelo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Marca } from 'src/marca/entities/marca.entity';


@Injectable()
export class ModeloService {
  private modelos: Modelo[] = [];
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(modeloDto: ModeloDto, marcaID: number): Promise<Modelo> {
    try {
      const criterioMarca: FindOneOptions = { where: { id: marcaID } };
      let marca: Marca = await this.marcaRepository.findOne(criterioMarca);
      if (!marca) throw new Error('No se encontro una marca con ese ID');
      const criterioModelo: FindOneOptions={where:{nombre: modeloDto.nombre}}
      let modeloExistente=await  this.modeloRepository.findOne(criterioModelo)
        if (modeloExistente) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Ya existe un modelo con este nombre.',
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          const modelo = new Modelo(modeloDto.nombre);
          modelo.marca = marca;
          return await this.modeloRepository.save(modelo);
        }
      
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al crear el modelo ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<Modelo[]> {
    const criterio: FindManyOptions = {
      relations: ['marca'],
    };
    this.modelos = await this.modeloRepository.find(criterio);
    return this.modelos;
  }

  public async findOne(id: number): Promise<Modelo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let modelo: Modelo = await this.modeloRepository.findOne(criterio);
      if (modelo) return modelo;
      else throw new Error('No se encontro un modelo con ese ID');
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

  async update(id: number, modeloDto: ModeloDto): Promise<Modelo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let modelo: Modelo = await this.modeloRepository.findOne(criterio);
      if (modelo) {
        modelo.setNombre(modeloDto.nombre);
        modelo = await this.modeloRepository.save(modelo);
        return modelo;
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
      let modelo: Modelo = await this.modeloRepository.findOne(criterio);
      if (!modelo) throw new Error('No se pudo eliminar');
      else {
        await this.modeloRepository.delete(id);
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
