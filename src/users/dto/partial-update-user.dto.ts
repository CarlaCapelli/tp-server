import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, NotContains } from 'class-validator';
import { Role } from 'src/common/enum/rol.enum';

export class PartialUpdateUserDto {

    @IsNotEmpty() @IsNumber()
    readonly id:number

    @IsOptional() @IsString() @MaxLength(200) 
    readonly name?: string;

    @IsOptional() @MaxLength(320) @NotContains(" ")
    readonly username?: string;

    @IsOptional() @IsString() @MaxLength(30)
    readonly role?: Role;

  }
  