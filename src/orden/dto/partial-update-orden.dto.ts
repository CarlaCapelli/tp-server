import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PartialUpdateOrdenDto {

    @IsOptional() @IsString()
    readonly accesorio?: string;

    @IsOptional() @IsString()
    readonly falla?: string;
    
    @IsOptional() @IsString()
    readonly informe?: string;

    @IsOptional() @IsNumber()
    readonly importe?: number;

    @IsNotEmpty() @IsNumber()
    readonly id_cliente: number;

    @IsNotEmpty() @IsNumber()
    readonly id_equipo: number
  }
  