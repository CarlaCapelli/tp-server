import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,

} from 'typeorm';

@Entity('modelo')
export class Modelo {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ unique: true })
  private nombre: string;
  @ManyToOne(() => Marca, (marca) => marca.modelos,{ nullable: false })                     
  marca: Marca;
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
