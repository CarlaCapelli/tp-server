import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class PartialUpdateNegocioDto {

    @IsOptional() @IsString() @MaxLength(200)
    readonly nombre?: string;

    @IsOptional() @IsString() @MaxLength(100)
    readonly pais?: string;

    @IsOptional() @IsString() @MaxLength(100)
    readonly provincia?: string;

    @IsOptional() @IsString() @MaxLength(100)
    readonly ciudad?: string;

    @IsOptional() @IsString() @MaxLength(300)
    readonly direccion?: string;

    @IsOptional() @IsEmail() @MaxLength(320)
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
  