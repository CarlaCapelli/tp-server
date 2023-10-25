import { IsNotEmpty, IsNumberString} from "class-validator";

export class SearchModelosDto {
  @IsNotEmpty() @IsNumberString()
  readonly id_tipo_equipo: number;

  @IsNotEmpty() @IsNumberString()
  readonly id_marca: number;
}
