import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { PartialUpdateOrdenDto } from './dto/partial-update-orden.dto';

@Injectable()
export class OrdenService {

  // Saltear estado 0 (Ingresada)
  saltearEstado0 = false;

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

      // Saltear estado Ingresada
      if (this.saltearEstado0){
        newOrden.setEstado(1)
      }

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
        if (estado == 5) {
          throw new Error(`Orden ${id} ya está en estado entregada`)
        } else {
          let estado = orden.getEstado()

          switch (estado) {
            case 0:     /// Si la esta en Ingresadas pasa a Diagnosticadas
              orden.setEstado(1)
              orden.setFechaDiagnosticada(this.fechaActual())
              break;
            case 1:    /// Si la esta en Diagnosticadas pasa a Presupuestada
              orden.setEstado(2)
              orden.setFechaPresupuestada(this.fechaActual())
              break;
            case 2:    /// Si la esta en Presupuestadas pasa a Pendientes
              orden.setEstado(3)
              orden.setPresupuestoAprobado(true);
              orden.setFechaPendiente(this.fechaActual())
              break;
            case 3:    /// Si la esta en Pendientes pasa a Terminadas
              orden.setEstado(4)
              orden.setFechaTerminada(this.fechaActual())
              break;
            case 4:    /// Si la esta en Terminadas pasa a Entregadas
              orden.setEstado(5)
              orden.setFechaEntregada(this.fechaActual())
              break;
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

  async presupuestoNA(idOrden: number) { // Presupuesto no aprobado
    try {
      let criterio: FindOneOptions = { where: { id: idOrden } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden) {
        throw new Error('No se encuentra la orden id: ' + idOrden);
      } else {
        let estado = orden.getEstado();
        if (estado != 2) {
          throw new Error(`Orden ${idOrden} no está presupuestada`)
        } else {
          orden.setEstado(4);
          orden.setPresupuestoAprobado(false);
          orden.setFechaTerminada(this.fechaActual())
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

  public async changeToPresupuestada(idOrden: number): Promise<Orden> {
    try {
      let orden = await this.findOne(idOrden)
      if (!orden) {
        throw new Error('No se encontro orden para volver a presupuestar')
      }
      let estado: number = orden.getEstado()

      if (estado == 3 || estado == 4) {
        orden.setEstado(2);
        orden.setPresupuestoAprobado(false);
        orden.setFechaPendiente(null)
        orden.setFechaTerminada(null)
        let ordenSave = await this.ordenRepository.save(orden);
        if (!ordenSave) {
          throw new Error("No se pudo cambiar el estado de la orden")
        } else {
          return ordenSave
        }
      } else {
        throw new Error("Orden no tiene estado para ser presupuestada nuevamente")
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  }

  async findOrdenesCliente(id: number): Promise<Orden[]> {
    try {
      let criterio: FindManyOptions = {
        where: { cliente: { id: id } },
        relations: ['equipo','equipo.modelo.tipoEquipo', 'equipo.modelo.marca', 'equipo.modelo'],
        select:['id', 'falla', 'equipo.modelo.nombre']
      }

      let ordenesCliente: Orden[] = await this.ordenRepository.find(criterio);

      if (!ordenesCliente) { throw new Error('Error al acceder a datos') }

      return ordenesCliente
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  }

  public async remove(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } }
      let orden = await this.ordenRepository.findOne(criterio)
      if (!orden) {
        throw new Error(`No se pudo encontrar id: ` + id)
      }
      orden.deleteOrden();
      orden.setFechaEliminada(this.fechaActual());
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

  public async restore(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } }
      let orden = await this.ordenRepository.findOne(criterio)
      if (!orden) {
        throw new Error(`No se pudo encontrar id: ` + id)
      }
      orden.restoreOrden();
      let restoreStatus = await this.ordenRepository.save(orden)
      if (!restoreStatus) {
        throw new Error('No se pudo restaurar la orden')
      } else {
        return true
      }
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  }
}
