import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { OrdenDto } from './dto/orden.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { Equipo } from 'src/equipo/entities/equipo.entity';

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
        throw new Error('No existe el cliente')
      };
      let criterioEquipo: FindOneOptions = {where: {id: ordenDto.id_equipo}};
      let equipo: Equipo = await this.equipoRepository.findOne(criterioEquipo);

      if (!equipo){
        throw new Error ('No se encontro el equipo')
      };

      let newOrden = new Orden(ordenDto.falla, ordenDto.accesorio);
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
      const criterio: FindManyOptions = { relations: ['cliente'] };
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
      const filter: FindOneOptions = { where: { id: id }, relations: ['cliente'] };
      let orden: Orden = await this.ordenRepository.findOne(filter);
      if (orden)
        return orden;
      else
        throw new Error("Error en busqueda de id: " + id);
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async update(id: number, updateOrdenDto: OrdenDto) {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden) {
        throw new Error('No se encuentra la orden');
      } else {
        orden.setFechaIngreso(updateOrdenDto.fechaIngreso);
        orden.setFechaEntregado(updateOrdenDto.fechaEntregado);
        orden.setFechaEntregado(updateOrdenDto.fechaEntregado);
        orden.setAccesorio(updateOrdenDto.accesorio);
        orden.setFalla(updateOrdenDto.falla);
        orden.setInforme(updateOrdenDto.informe);
        orden.setImporte(updateOrdenDto.importe);
        orden.setEstado(updateOrdenDto.estado)
        orden = await this.ordenRepository.save(orden);
        return orden;
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  private checkEstado(estadoToCheck: number): boolean {
    return estadoToCheck > 2 || estadoToCheck < 0;
  };

  async changeEstado(id: number) {
    try {
      let newEstado: number = 0;
      let criterio: FindOneOptions = { where: { id: id } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden) {
        throw new Error('No se encuentra la orden');
      } else {
        newEstado = (orden.getEstado() + 1);
        if (this.checkEstado(newEstado)) {
          throw new Error('Orden ya está en estado entregada')
        } else {
          orden.setEstado(newEstado)
          orden = await this.ordenRepository.save(orden);
          return orden
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
      else {
        await this.ordenRepository.delete(id)
      }
      return true
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };
}
