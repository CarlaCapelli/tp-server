import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class PartialUpdateNegocioDto {

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(200)
    readonly nombre?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(100)
    readonly pais?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(100)
    readonly provincia?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(100)
    readonly ciudad?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(300)
    readonly direccion?: string;

    @IsOptional() @IsNotEmpty() @IsEmail() @MaxLength(320)
    readonly email?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(30)
    readonly telefono?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(30)
    readonly celular?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(13)
    readonly cuit?: string;

    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(180)
    readonly razonSocial?: string;
  }
  