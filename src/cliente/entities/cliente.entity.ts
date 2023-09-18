import { Entity, PrimaryGeneratedColumn, OneToMany, Column, OneToOne,JoinColumn } from 'typeorm';
import { Orden } from 'src/orden/entities/orden.entity';

@Entity('cliente')
export class Cliente {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({nullable: false, type: 'varchar', length: 550 })
  private nombre: string;

  @Column({nullable: false, type: 'varchar', length: 50 })
  private telefono: string;

  @Column({ nullable: true, type: 'integer', width: 10})
  private dni?: number;

  constructor(nombre: string, telefono: string, dni?:number) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.dni = dni;
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

  public setDni(newDNI:number):void{
    this.dni = newDNI
  }

  public getDni():number{
    return this.dni
  }

  @OneToMany(()=>Orden, orden => orden.cliente)
  @JoinColumn({name:'id_orden'})
  orden:Orden[];

}