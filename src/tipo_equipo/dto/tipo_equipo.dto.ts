import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TipoEquipoDto {
    @IsNotEmpty() @IsString() @MaxLength(50)
    readonly nombre: string;
}

