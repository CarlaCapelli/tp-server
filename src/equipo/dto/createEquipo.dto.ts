import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateEquipoDto {

  @IsNotEmpty() @IsString() @MaxLength (100)
  readonly n_serie?: string;

  @IsNotEmpty() @IsNumber()
  readonly modeloID: number;

}