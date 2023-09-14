import { Modelo } from 'src/modelo/entities/modelo.entity';
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
    @Column({ unique: true })
    private nombre: string;
   @OneToMany(()=> Modelo,modelos=>modelos.marca)
    modelos:Modelo[]
 
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
  