import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity('orden')
export class Orden {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  private fechaIngreso: Date;

  @Column({ nullable: true })
  private fechaRevisado: Date;

  @Column({ nullable: true })
  private fechaEntregado: Date;

  @Column({ nullable: true })
  private accesorio: string;

  @Column()
  private falla: string;

  @Column({ nullable: true })
  private informe: string;

  @Column({ nullable: true })
  private importe: number;

  @Column({ default: () => 0 })
  private estado: number;

  constructor(falla: string, accesorio:string) {
    this.falla = falla;
    this.accesorio = accesorio;
  }

  public getIdOrden(): number {
    return this.id;
  };

  public getFechaIngreso(): Date {
    return this.fechaIngreso;
  };

  public getFechaRevisado(): Date {
    return this.fechaRevisado;
  };

  public setFalla(falla:string) {
    this.falla = falla
  };
  
  public setFechaIngreso(fechaIngreso: Date): void {
    this.fechaIngreso = fechaIngreso;
  };

  public setFechaRevisado(fechaRevisado: Date): void {
    this.fechaRevisado = fechaRevisado;
  };

  public getFechaEntregado(): Date {
    return this.fechaEntregado;
  };

  public setFechaEntregado(fechaEntregado: Date): void {
    this.fechaEntregado = fechaEntregado;
  };

  public getAccesorio():string{
    return this.accesorio;
  };

  public setAccesorio(newAccesorio:string):void{
    this.accesorio = newAccesorio;
  };

  public getFalla():string {
    return this.falla;
  };

  public getInforme(): string{
    return this.informe
  };

  public setInforme(newInforme:string):void {
    this.informe = newInforme;
  };

  public getImporte():number {
    return this.importe;
  };

  public setImporte(newImporte: number):void{
    this.importe = newImporte;
  };

  public getEstado():number {
    return this.estado;
  };

  public setEstado(newEstado:number): void {
    this.estado = newEstado;
  }

  @ManyToOne(()=> Cliente, cliente => cliente.orden)
  @JoinColumn({name:'id_cliente'})
  cliente: Cliente;

}