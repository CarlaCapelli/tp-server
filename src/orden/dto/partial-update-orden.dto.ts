import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PartialUpdateOrdenDto {

    @IsString()
    readonly accesorio?: string;

    @IsString()
    readonly falla?: string;
    
    @IsString()
    readonly informe?: string;

    @IsNumber()
    readonly importe?: number;

    @IsNotEmpty() @IsNumber()
    readonly id_cliente: number;

    @IsNotEmpty() @IsNumber()
    readonly id_equipo: number
  }
  