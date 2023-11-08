import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, NotContains } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString() @IsNotEmpty() 
  name: string;

  @IsString() @NotContains(" ")
  username: string;

  @Transform(({ value }) => value.trim())
  @IsString() @MinLength(6)
  password: string;
}
