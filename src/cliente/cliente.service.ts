import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) { }

  async create(createClienteDto: ClienteDto) {
    try {
      let cliente: Cliente = await this.clienteRepository.save(new Cliente(createClienteDto.nombre, createClienteDto.telefono, createClienteDto.dni));
      if (cliente)
        return cliente;
      else
        throw new Error("No se pudo crear cliente");
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la creacion de cliente' + error
      }, HttpStatus.NOT_FOUND);
    }
  };

  async findAll() {
    let allClientes: Cliente[] = await this.clienteRepository.find();
    return allClientes;
  }

  async findOne(id: number) {
    try {
      const filter: FindOneOptions = { where: { id: id } };
      let cliente: Cliente = await this.clienteRepository.findOne(filter);
      if (cliente)
        return cliente;
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

  async update(id: number, updateClienteDto: ClienteDto) {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let cliente: Cliente = await this.clienteRepository.findOne(criterio);
      if (!cliente)
        throw new Error('No se encuentra el cliente');
      else
        cliente.setNombre(updateClienteDto.nombre);
      cliente.setTelefono(updateClienteDto.telefono);
      cliente.setDni(updateClienteDto.dni);

      cliente = await this.clienteRepository.save(cliente);
      return cliente;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la actiualizacion de cliente ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }

  public async remove(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } }
      let cliente = await this.clienteRepository.findOne(criterio)
      if (!cliente) {
        throw new Error(`No se pudo encontrar id: ` + id)
      }
      else {
        await this.clienteRepository.delete(id)
      }
      return true
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND
      )
    }
  }
}
