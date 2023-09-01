import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { OrdenDto } from './dto/orden.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class OrdenService {

  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    private readonly clienteService: ClienteService

  ) { }

  async create(createOrdenDto: OrdenDto, idCliente: number) {
    try {
      const cliente = await this.clienteService.findOne(idCliente)

      if (cliente) {
        let orden = new Orden(createOrdenDto.falla, createOrdenDto.accesorio);
        orden.cliente = cliente;
        await this.ordenRepository.save(orden);

        if (orden)
          return orden;
        else
          throw new Error("No se pudo crear orden");
      }
      else {
        throw new Error(`No se encontro cliente con id: ${idCliente}`);
      }
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion de orden' + error
      }, HttpStatus.NOT_FOUND);
    }
  };

  async findAll() {
    const criterio: FindManyOptions = { relations: ['cliente'] };
    let allOrden: Orden[] = await this.ordenRepository.find(criterio);
    return allOrden;
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
        HttpStatus.NOT_FOUND
      );
    }
  };

  async update(id: number, updateOrdenDto: OrdenDto) {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let orden: Orden = await this.ordenRepository.findOne(criterio);
      if (!orden)
        throw new Error('No se encuentra la orden');
      else
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
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la actiualizacion de la orden ' + error
      }, HttpStatus.NOT_FOUND);
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
      }
      else {
        newEstado = (orden.getEstado() + 1);
        if (this.checkEstado(newEstado)) {
          throw new Error('Orden ya esta en estado entregada')
        } else {
          orden.setEstado(newEstado)
          orden = await this.ordenRepository.save(orden);
          return orden
        }
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la actiualizacion de estado de la orden ' + error
      }, HttpStatus.NOT_FOUND);
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
        HttpStatus.NOT_FOUND
      )
    }
  };
}
