import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';

export class PartialUpdateClienteDto {
    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(550)
    readonly nombre?:string;

    @IsOptional() @IsNotEmpty() @MaxLength(50)
    readonly telefono?:string;

    @IsOptional() 
    readonly dni?: string;

    @IsOptional() @IsString() @MaxLength(750)
    readonly descripcion?:string;
}