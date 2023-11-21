import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, NotContains } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @NotContains(" ")
  @MinLength(5)
  @IsNotEmpty()
  username: string;

  @Transform(({ value }) => (value ? value.trim() : value))
  @IsString()
  @MinLength(6)
  password: string;
}

