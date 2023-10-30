import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { PartialUpdateClienteDto } from './dto/partial-update-cliente.dto';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) { }

  async create(createClienteDto: ClienteDto) {
    try {
      let newCliente: Cliente = new Cliente(createClienteDto.nombre, createClienteDto.telefono, createClienteDto.dni,createClienteDto.descripcion)
      let cliente: Cliente = await this.clienteRepository.save(newCliente);

      if (!cliente) {
        throw new Error("No se pudo crear cliente");
      } else {
        return cliente;
      }
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async findAll() {
    try{
      let allClientes: Cliente[] = await this.clienteRepository.find();
      if (!allClientes){
        throw new Error('No se pudo acceder a los datos de clientes')
      }
      return allClientes;
    } catch(error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number) {
    try {
      const filter: FindOneOptions = { where: { id: id } };
      let cliente: Cliente = await this.clienteRepository.findOne(filter);

      if (!cliente) {
        throw new Error("Error en busqueda de cliente, id: " + id);
      } else {
        return cliente;
      }
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  async update(id: number, updateClienteDto: PartialUpdateClienteDto) {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let cliente: Cliente = await this.clienteRepository.findOne(criterio);

      if (!cliente) {
        throw new Error('No se encuentra el cliente');
      }

      Object.assign(cliente, updateClienteDto);

      let updatedCliente = await this.clienteRepository.save(cliente);

      if (!updatedCliente) {
        throw new Error('No se pudo actualizar cliente')
      } else {
        return cliente;
      }
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };

  public async remove(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } }
      let cliente = await this.clienteRepository.findOne(criterio)
      if (!cliente) {
        throw new Error(`No se pudo encontrar id: ` + id)
      } 

      let clienteDelete = await this.clienteRepository.delete(id)
      if (!clienteDelete){
        throw new Error('No se pudo borrar cliente id:'+id)
      } else {
        return true
      }
    }
    catch (error) {
      if (error.message.includes('Cannot delete or update a parent row')) {
        throw new Error('CLIENTE_EN_USO');
      }
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }
  };
}
