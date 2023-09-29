import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class PartialUpdateClienteDto {
    @IsNotEmpty() @IsString() @MaxLength(550)
    readonly nombre?:string;

    @IsNotEmpty() @MaxLength(50)
    readonly telefono?:string;

    @IsNumber() @MaxLength(10)
    readonly dni?: number;
}