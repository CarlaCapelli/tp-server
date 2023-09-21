import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class EquipoDto {
  @IsNotEmpty() @IsString() @MaxLength(100)
  readonly n_serie: string;
}
