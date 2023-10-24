import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PartialUpdateNegocioDto {

    @IsNotEmpty() @IsString() @MaxLength(200)
    readonly nombre?: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly pais?: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly provincia?: string;

    @IsNotEmpty() @IsString() @MaxLength(100)
    readonly ciudad?: string;

    @IsNotEmpty() @IsString() @MaxLength(300)
    readonly direccion?: string;

    @IsNotEmpty() @IsEmail() @MaxLength(320)
    readonly email?: string;

    @IsNotEmpty() @IsString() @MaxLength(30)
    readonly telefono?: string;

    @IsNotEmpty() @IsString() @MaxLength(30)
    readonly celular?: string;

    @IsNotEmpty() @IsString() @MaxLength(13)
    readonly cuit?: string;

    @IsNotEmpty() @IsString() @MaxLength(180)
    readonly razonSocial?: string;
  }
  