import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('negocio')
export class Negocio {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: 'varchar', length: 200 })
    private nombre: string;

    @Column({ type: 'varchar', length: 100})
    private pais: string;

    @Column({ type: 'varchar', length: 100})
    private provincia: string;

    @Column({ type: 'varchar', length: 100})
    private ciudad: string;

    @Column({ type: 'varchar', length: 300 })
    private direccion: string;

    @Column({ type: 'varchar', length: 320 })
    private email: string;

    @Column({ type: 'varchar', length: 30})
    private telefono: string;

    @Column({ type: 'varchar', length: 30})
    private celular: string;

    @Column({ type: 'varchar', length: 13})
    private cuit: string;

    @Column({ type: 'varchar', length: 180})
    private razonSocial: string;

    constructor(nombre: string, pais:string, provincia:string, ciudad:string, direccion:string, celular?:string, telefono?:string,cuit?:string,razonSocial?:string) {
        this.nombre = nombre;
        this.pais = pais;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.celular = celular;
        this.telefono = telefono;
        this.cuit = cuit;
        this.razonSocial = razonSocial;
    };

    public getId(): number {
        return this.id;
    };

    public getNombre(): string {
        return this.nombre;
    };

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    };

    public getPais(): string {
        return this.pais;
    };

    public setPais(nombrePais: string): void {
        this.pais = nombrePais;
    };

    public getProvincia(): string {
        return this.provincia;
    };

    public setProvincia(nombreProvincia: string): void {
        this.provincia = nombreProvincia;
    };

    public getCiudad(): string {
        return this.ciudad;
    };

    public setCiudad(nombreCiudad: string): void {
        this.ciudad = nombreCiudad;
    };

    public getDireccion(): string {
        return this.direccion;
    };

    public setDireccion(direccion: string): void {
        this.direccion = direccion;
    };

    public getEmail(): string {
        return this.email;
    };

    public setEmail(email: string): void {
        this.email = email;
    };

    public getTelefono(): string {
        return this.telefono;
    };

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    };

    public getCelular(): string {
        return this.celular;
    };

    public setCelular(celular: string): void {
        this.celular = celular;
    };

    public getCuit(): string {
        return this.cuit;
    };

    public setCuit(cuit: string): void {
        this.cuit = cuit;
    };

    public getRazonSocial(): string {
        return this.razonSocial;
    };

    public setRazonSocial(razonSocial: string): void {
        this.razonSocial = razonSocial;
    };

}
