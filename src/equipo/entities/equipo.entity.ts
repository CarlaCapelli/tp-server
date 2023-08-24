import { Marca } from 'src/marca/entities/marca.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('equipo')
export class Equipo {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ nullable: true })
  private n_serie: string;
  @ManyToOne(() => Marca, (marca) => marca.equipos)
  marca: Marca;
  @ManyToOne(() => Modelo, (modelo) => modelo.equipos)
  modelo: Modelo;
  @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.equipos)
  tipoEquipo: TipoEquipo;
  
  constructor(n_serie: string) {
    this.n_serie = n_serie;
  }
  public getId(): number {
    return this.id;
  }
  public getNSerie(): string {
    return this.n_serie;
  }
  public setNSerie(n_serie: string): void {
    this.n_serie = n_serie;
  }
}