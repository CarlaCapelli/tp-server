import { Equipo } from 'src/equipo/entities/equipo.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  
  } from 'typeorm';
  
  @Entity('marca')
  export class Marca {
    @PrimaryGeneratedColumn()
    private id: number;
    @Column()
    private nombre: string;
   @OneToMany(()=> Equipo,equipos=>equipos.marca)
    equipos:Equipo[]
 
    constructor(nombre: string) {
      this.nombre = nombre;
    }
    public getId(): number {
      return this.id;
    }
    public getNombre(): string {
      return this.nombre;
    }
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  }
  