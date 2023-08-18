import { Entity, PrimaryGeneratedColumn, OneToMany, Column, OneToOne,JoinColumn } from 'typeorm';
import { Orden } from 'src/orden/entities/orden.entity';

@Entity('cliente')
export class Cliente {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private nombre: string;

  @Column()
  private telefono: string;

  @Column({ nullable: true })
  private dni: string;

  constructor(nombre: string, telefono: string) {
    this.nombre = nombre;
    this.telefono = telefono;
  }

  public getIdCliente(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getTelefono():string{
    return this.telefono;
  }

  public setTelefono(newTelefono:string):void {
    this.telefono = newTelefono
  }

  @OneToMany(()=>Orden, orden => orden.cliente)
  @JoinColumn({name:'id_orden'})
  orden:Orden;

}