import { Equipo } from 'src/equipo/entities/equipo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,

} from 'typeorm';

@Entity('modelo')
export class Modelo {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private nombre: string;
  @OneToMany(()=> Equipo,equipos=>equipos.modelo)
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
