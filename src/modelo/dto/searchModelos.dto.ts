import { IsNotEmpty, IsNumber, IsNumberString} from "class-validator";

export class SearchModelosDto {
  @IsNotEmpty() @IsNumberString()
  readonly id_tipo_equipo: string;

  @IsNotEmpty() @IsNumberString()
  readonly id_marca: string;
}
