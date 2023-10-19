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
import { CreateModeloDto } from './dto/createModelo.dto';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import { SearchModelosDto } from './dto/searchModelos.dto';


@Injectable()
export class ModeloService {
  private modelos: Modelo[] = [];
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    @InjectRepository(TipoEquipo)
    private readonly tipoEquipoRepository: Repository<TipoEquipo>
  ) { }

  async create(createModeloDto: CreateModeloDto): Promise<Modelo> {
    try {
      const criterioMarca: FindOneOptions = { where: { id: createModeloDto.marcaID } };
      let marca: Marca = await this.marcaRepository.findOne(criterioMarca);
      if (!marca) throw new Error('No se encontro una marca con ese ID');

      const criterioTipoEquipo: FindOneOptions = { where: { id: createModeloDto.tipoEquipoID } };
      let tipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne(criterioTipoEquipo);
      if (!tipoEquipo) throw new Error('No se encontro un tipo equipo con ese ID');


      const criterioModelo: FindOneOptions = { where: { nombre: createModeloDto.nombre, 
        id_marca:createModeloDto.marcaID, 
        id_tipo_equipo: createModeloDto.tipoEquipoID }}

      let modeloExistente = await this.modeloRepository.findOne(criterioModelo)
      if (modeloExistente) { return modeloExistente } // Habria que agregar una respuesta para avisar que esta repetido el nombre
      else {
        const modelo = new Modelo(createModeloDto.nombre);
        modelo.marca = marca;
        modelo.tipoEquipo = tipoEquipo;
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
      relations: ['marca', 'tipoEquipo'],
    };
    this.modelos = await this.modeloRepository.find(criterio);
    return this.modelos;
  }

  public async findOne(id: number): Promise<Modelo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } , relations: ['marca', 'tipoEquipo']};
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

  public async searchModelos(searchModelosDto: SearchModelosDto): Promise<Modelo[]> {
    try {
      const idTipoEquipo = searchModelosDto.id_tipo_equipo
      const idMarca = searchModelosDto.id_marca
   
      const filter: FindManyOptions = {
        where: {
          tipoEquipo: {id: idTipoEquipo},
          marca: {id: idMarca},
        },
        relations: ['tipoEquipo', 'marca'],
      }
      
      const modelos: Modelo[] = await this.modeloRepository.find(filter);

      if (!modelos[0]) //throw new Error(`No se encontraron modelos`);
      return modelos
      else {
        return modelos;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  };
}
