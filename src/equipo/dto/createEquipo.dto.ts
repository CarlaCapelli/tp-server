import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEquipoDto {

  @IsOptional() @IsNotEmpty() @IsString() @MaxLength (100)
  readonly n_serie?: string;

  @IsNotEmpty() @IsNumber()
  readonly modeloID: number;

}