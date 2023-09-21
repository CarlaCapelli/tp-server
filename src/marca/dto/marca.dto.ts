import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MarcaDto {
    @IsNotEmpty() @IsString() @MaxLength(100) 
    readonly nombre: string;
  }
  
