import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ModeloDto {
    @IsNotEmpty() @IsString() @MaxLength(100)
    nombre: string;
}

