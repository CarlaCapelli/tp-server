import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateModeloDto {

    @IsNotEmpty() @IsString() @MaxLength(100)
    nombre: string;

    @IsNotEmpty() @IsNumber()
    marcaID:number;

    @IsNotEmpty() @IsNumber()
    tipoEquipoID:number;
}
