import { IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';

export class ClienteDto {
    
    @IsNotEmpty() @IsString() @MaxLength(550)
    readonly nombre:string;

    @IsNotEmpty() @MaxLength(50)
    readonly telefono:string;

    @IsOptional()
    readonly dni?: number;

    @IsOptional() @IsString() @MaxLength(750)
    readonly descripcion?:string;

}
