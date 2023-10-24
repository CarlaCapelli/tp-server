import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ClienteDto {
    
    @IsNotEmpty() @IsString() @MaxLength(550)
    readonly nombre:string;

    @IsNotEmpty() @MaxLength(50)
    readonly telefono:string;

    @IsOptional() @IsNumber() @MaxLength(10)
    readonly dni?: number;

    @IsString() @MaxLength(750)
    readonly descripcion?:string;

}
