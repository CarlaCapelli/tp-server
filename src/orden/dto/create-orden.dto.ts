import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrdenDto {

    @IsOptional() @IsString() @MaxLength(250)
    readonly accesorio?: string;

    @IsNotEmpty() @IsString() @MaxLength(550)
    readonly falla: string;

    @IsNotEmpty() @IsNumber()
    readonly id_cliente: number;

    @IsNotEmpty() @IsNumber()
    readonly id_equipo: number;
}
