import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNegocioDto {

    @IsNotEmpty() @IsString() @MaxLength(200)
    readonly nombre: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly pais: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly provincia: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly ciudad: string;

    @IsNotEmpty() @IsString() @MaxLength(300)
    readonly direccion: string;

    @IsOptional() @IsNotEmpty() @IsEmail() @MaxLength(320)
    readonly email?: string;

    @IsOptional() @IsString() @MaxLength(30) 
    readonly telefono?: string;

    @IsOptional() @IsString() @MaxLength(30)
    readonly celular?: string;

    @IsOptional() @IsString() @MaxLength(13)
    readonly cuit?: string;

    @IsOptional() @IsString() @MaxLength(180)
    readonly razonSocial?: string;

}
