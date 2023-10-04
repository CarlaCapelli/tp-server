import { IsNotEmpty, IsNumber} from "class-validator";

export class SearchModelosDto {
  @IsNotEmpty() @IsNumber()
  readonly id_tipo_equipo: number;

  @IsNotEmpty() @IsNumber()
  readonly id_marca: number;
}
