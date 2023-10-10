import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
/*import { UpdateOrdenDto } from './dto/update-orden.dto';*/
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { getManager } from 'typeorm';
import { PartialUpdateOrdenDto } from './dto/partial-update-orden.dto';

@Injectable()
export class OrdenService {

  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) { }

  async create(ordenDto: CreateOrdenDto): Promise<Orden> {
    try {
      let criterioCliente: FindOneOptions = { where: { id: ordenDto.id_cliente } };
      let cliente: Cliente = await this.clienteRepository.findOne(criterioCliente);
      if (!cliente) {
        throw new Error('No se encontró cliente con id: ' + ordenDto.id_cliente)
      };

      let criterioEquipo: FindOneOptions = { where: { id: ordenDto.id_equipo } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterioEquipo);
      if (!equipo) {
        throw new Error('No se encontró el equipo id: ' + ordenDto.id_equipo)
      };

      let newOrden = new Orden(ordenDto.falla, ordenDto.accesorio, this.fechaActual());
      newOrden.cliente = cliente;
      newOrden.equipo = equipo;

      let orden = await this.ordenRepository.save(newOrden);

      if (!orden) {
        throw new Error("No se pudo crear orden");
      }
      return orden;

    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async findAll() {
    try {
      const criterio: FindManyOptions = { relations: ['cliente', 'equipo'] };
      let allOrden: Orden[] = await this.ordenRepository.find(criterio);
      if (!allOrden) {
        throw new Error('No se puedo acceder los datos')
      }
      return allOrden;
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async findOne(id: number) {
    try {
      const filter: FindOneOptions = { where: { id: id }, relations: ['cliente', 'equipo', 'equipo.modelo.tipoEquipo', 'equipo.modelo.marca', 'equipo.modelo'] };//modifique
      let orden: Orden = await this.ordenRepository.findOne(filter);
      if (orden)
        return orden;
      else
        throw new Error("No se encontró orden con id: " + id);
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async update(id: number, updateOrdenDto: PartialUpdateOrdenDto) {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden) {
        throw new Error('No se encuentra la orden id: ' + id);
      };

      let criterioCliente: FindOneOptions = { where: { id: updateOrdenDto.id_cliente } };
      let cliente: Cliente = await this.clienteRepository.findOne(criterioCliente);
      if (!cliente) {
        throw new Error('No se encontró el cliente id: ' + updateOrdenDto.id_cliente)
      };

      let criterioEquipo: FindOneOptions = { where: { id: updateOrdenDto.id_equipo } };
      let equipo: Equipo = await this.equipoRepository.findOne(criterioEquipo);
      if (!equipo) {
        throw new Error('No se encontró el equipo id: ' + updateOrdenDto.id_equipo)
      };

      Object.assign(orden, updateOrdenDto);
      orden.cliente = cliente;
      orden.equipo = equipo;
      orden = await this.ordenRepository.save(orden);
      return orden;

    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  private fechaActual(): Date {
    const currentDate = new Date();
    const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    return formattedDate
  };

  async changeEstado(id: number) {
    try {
      let estado: number = 0;
      let criterio: FindOneOptions = { where: { id: id } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden) {
        throw new Error('No se encuentra la orden id: ' + id);
      } else {
        estado = orden.getEstado();
        if (estado == 2) {
          throw new Error(`Orden ${id} ya está en estado entregada`)
        } else {
          let estado = orden.getEstado()

          switch (estado) {
            case 0:     /// Si la orden pasa de Pendiente a Terminada
              orden.setEstado(1)
              orden.setFechaRevisado(this.fechaActual())
              break
            case 1:    /// Si la orden pasa de Terminada a Entregada
              orden.setEstado(2)
              orden.setFechaEntregado(this.fechaActual())
              break
          }
          let ordenSave = await this.ordenRepository.save(orden);
          if (!ordenSave) {
            throw new Error("no se pudo cambiar el estado de la orden")
          } else {
            return ordenSave
          }
        }
      };
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  public async remove(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } }
      let orden = await this.ordenRepository.findOne(criterio)
      if (!orden) {
        throw new Error(`No se pudo encontrar id: ` + id)
      }
      orden.setEstado(4)
      let deleteStatus = await this.ordenRepository.save(orden)
      if (!deleteStatus) {
        throw new Error('No se pudo eliminar la orden')
      } else {
        return true
      }
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };
}
