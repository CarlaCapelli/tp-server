import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Equipo } from '../../equipo/entities/equipo.entity';

@Entity('orden')
export class Orden {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false, type: 'date'})
  private fechaIngreso: Date;

  @Column({ nullable: true, type: 'date'})
  private fechaDiagnosticada: Date;

  @Column({ nullable: true, type: 'date'})
  private fechaPresupuestada: Date;

  @Column({ nullable: true, type: 'date'})
  private fechaPendiente: Date;

  @Column({ nullable: true, type: 'date'})
  private fechaTerminada: Date;

  @Column({ nullable: true, type: 'date' })
  private fechaEntregada: Date;

  @Column({ nullable: true, type: 'date' })
  private fechaEliminada: Date;

  @Column({ nullable: true, type: 'varchar', length: 250 })
  private accesorio: string;

  @Column({ nullable: false, type: 'varchar', length: 550 })
  private falla: string;

  @Column({ nullable: true, type: 'varchar', length: 600 })
  private informe: string;

  @Column({ nullable: true, type: 'varchar', length: 600 })
  private presupuesto: string;

  @Column({ default: () => false, type: 'boolean'})
  private presupuestoAprobado: boolean;

  @Column({ default: () => false, type: 'boolean'})
  private sinReparacion: boolean;

  @Column({ nullable: true, type: 'decimal', precision: 12, scale: 2})
  private importe: number;

  @Column({ default: () => 0, type: 'tinyint', width: 1 })
  private estado: number;

  @Column({ nullable: true, type: 'tinyint', width: 1  })
  private estadoDeleted: number;

  constructor(falla: string,fechaIngreso:Date, accesorio?:string, ) {
    this.falla = falla;
    this.fechaIngreso = fechaIngreso;
    this.accesorio = accesorio;
  };

  public getIdOrden(): number {
    return this.id;
  };

  public setFalla(falla:string) {
    this.falla = falla
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

  public getPresupuesto(): string{
    return this.presupuesto
  };

  public setPresupuesto(newPresupuesto:string):void {
    this.presupuesto = newPresupuesto;
  };

  public getPresupuestoAprobado(): boolean{
    return this.presupuestoAprobado
  };

  public setPresupuestoAprobado(estado:boolean):void {
    this.presupuestoAprobado = estado;
  };

  public getImporte():number {
    return this.importe;
  };

  public getSinReparacion():boolean {
    return this.sinReparacion;
  };

  public setSinReparacion(estado:boolean):void{
    this.sinReparacion = estado
  }

  public setImporte(newImporte: number):void{
    this.importe = newImporte;
  };

  public getEstado():number {
    return this.estado;
  };

  public setEstado(newEstado:number): void {
    this.estado = newEstado;
  };

  public deleteOrden():void {
    this.estadoDeleted = this.estado;
    this.estado = 6;
  }

  public restoreOrden(): void {
    this.estado = this.estadoDeleted
    this.estadoDeleted = null;
    this.fechaEliminada = null;
  };


  // Fechas estados //

  public getFechaIngreso(): Date {
    return this.fechaIngreso;
  };

  public setFechaIngreso(fechaIngreso: Date): void {
    this.fechaIngreso = fechaIngreso;
  };

  public getFechaDiagnosticada(): Date{
    return this.fechaDiagnosticada;
  };

  public setFechaDiagnosticada(fecha: Date): void {
    this.fechaDiagnosticada = fecha;
  };

  public getFechaPresupuestada(): Date{
    return this.fechaPresupuestada;
  };

  public setFechaPresupuestada(fecha: Date): void {
    this.fechaPresupuestada = fecha;
  };

  public getFechaPendiente(): Date{
    return this.fechaPendiente;
  };

  public setFechaPendiente(fecha: Date): void {
    this.fechaPendiente = fecha;
  };

  public getFechaTerminada():Date{
    return this.fechaTerminada;
  };
  
  public setFechaTerminada(fecha: Date): void {
    this.fechaTerminada = fecha;
  };

  public getFechaEntregada():Date{
    return this.fechaEntregada;
  };

  public setFechaEntregada(fecha: Date): void {
    this.fechaEntregada = fecha;
  };

  public getFechaEliminada():Date{
    return this.fechaEliminada;
  };

  public setFechaEliminada(fecha: Date): void {
    this.fechaEliminada = fecha;
  };

  @ManyToOne(()=> Cliente, cliente => cliente.orden)
  @JoinColumn({name:'id_cliente'})
  cliente: Cliente;

  @ManyToOne(()=> Equipo, equipo => equipo.orden)
  @JoinColumn({name:'id_equipo'})
  equipo: Equipo;

}