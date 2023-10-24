import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class EquipoDto {
  @IsOptional() @IsNotEmpty() @IsString() @MaxLength(100)
  readonly n_serie?: string;
}
