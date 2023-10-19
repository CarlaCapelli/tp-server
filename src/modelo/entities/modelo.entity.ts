import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { TipoEquipo } from 'src/tipo_equipo/entities/tipo_equipo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('modelo')
export class Modelo {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: 'varchar', length: 100})
  private nombre: string;

  @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.modelos ,{ nullable: false })
  @JoinColumn({ name: 'id_tipo_equipo' })
  tipoEquipo: TipoEquipo;

  @ManyToOne(() => Marca, (marca) => marca.modelos,{ nullable: false })         
  @JoinColumn({ name: 'id_marca' })            
  marca: Marca;

  @OneToMany(()=> Equipo,equipos=>equipos.modelo)
  equipos:Equipo[]
  
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getId(): number {
    return this.id;                     
  };
  
  public getNombre(): string {
    return this.nombre;
  };

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  };
}
