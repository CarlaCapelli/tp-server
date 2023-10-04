import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipoEquipo')
export class TipoEquipo {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ unique: true, type: 'varchar', length: 50  })
  private nombre: string;

  @OneToMany(() => Modelo, (modelos) => modelos.tipoEquipo)
  modelos: Modelo[];

  constructor(nombre: string) {
    this.nombre = nombre;
  };

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
