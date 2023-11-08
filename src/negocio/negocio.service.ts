import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Negocio } from './entities/negocio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { PartialUpdateNegocioDto } from './dto/partial-update-negocio-dto';

@Injectable()
export class NegocioService {

    constructor(
        @InjectRepository(Negocio)
        private readonly negocioRepository: Repository<Negocio>
    ) { }

    async create(negocioDto: CreateNegocioDto): Promise<Negocio> {
        try {
            let criterio : FindOneOptions = {where: {id:1}}
            let negocioCreado : Negocio = await this.negocioRepository.findOne(criterio)

            if (negocioCreado){
                throw new Error ('Ya hay creado un negocio')
            }

            let newNegocio = new Negocio(
                negocioDto.nombre, negocioDto.pais, 
                negocioDto.provincia, negocioDto.ciudad,
                negocioDto.direccion, negocioDto.email,
                negocioDto.celular, negocioDto.telefono, 
                negocioDto.cuit, negocioDto.razonSocial);
            
            newNegocio.setId(1)

            let negocio = await this.negocioRepository.save(newNegocio);

            if (!negocio) { throw new Error("No se pudo crear negocio") };

            return negocio;
        }
        catch (error) {
            throw new HttpException(
                { status: HttpStatus.NOT_FOUND, error: `${error}` },
                HttpStatus.NOT_FOUND)
        }
    };

    async update(updateNegocioDto: PartialUpdateNegocioDto) {
        try {
          let criterio: FindOneOptions = { where: { id: 1 } };
          let negocio: Negocio = await this.negocioRepository.findOne(criterio);
          if (!negocio) {
            throw new Error('Aun no se ha creado el negocio');
          };
    
          Object.assign(negocio, updateNegocioDto);
          let negocioSave = await this.negocioRepository.save(negocio);

          if (!negocioSave) {
            throw new Error('No se pudo actualizar el negocio')
          }

          return negocioSave;
    
        } catch (error) {
          throw new HttpException(
            { status: HttpStatus.NOT_FOUND, error: `${error}` },
            HttpStatus.NOT_FOUND)
        }
      };

      async get(): Promise<Negocio> {
        try {
            let criterio: FindOneOptions = {where: {id:1}}

            let negocio : Promise<Negocio> = this.negocioRepository.findOne(criterio)

            if (!negocio){
                throw new Error ('No se encontro negocio')
            }

            return negocio;
        }
        catch (error) {
            throw new HttpException(
                { status: HttpStatus.NOT_FOUND, error: `${error}` },
                HttpStatus.NOT_FOUND)
        }
    };

}
